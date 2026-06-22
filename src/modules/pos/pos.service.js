const PosOrder = require("./posOrder.model");
const Product = require("../products/product.model");
const Customer = require("../customers/customer.model");
const stockService = require("../stock/stock.service");
const generateCode = require("../../common/utils/generate-code");
const eventBus = require("../../common/events/eventBus");
const EVENTS = require("../../common/events/eventTypes");

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

const computeTotals = (order) => {
    const subtotal = round2(
        (order.items || []).reduce((sum, it) => sum + round2(it.qty * it.unitPrice), 0)
    );

    let discountAmount = 0;
    if (order.discount?.type === "PERCENT") {
        discountAmount = round2((subtotal * (order.discount?.value || 0)) / 100);
    } else {
        discountAmount = round2(order.discount?.value || 0);
    }
    if (discountAmount > subtotal) discountAmount = subtotal;

    const taxableBase = round2(subtotal - discountAmount);

    let taxAmount = 0;
    if (order.tax?.type === "PERCENT") {
        taxAmount = round2((taxableBase * (order.tax?.value || 0)) / 100);
    } else {
        taxAmount = round2(order.tax?.value || 0);
    }

    const shippingAmount = round2(order.shippingAmount || 0);

    const totalAmount = round2(Math.max(0, taxableBase + taxAmount + shippingAmount));

    order.subtotal = subtotal;
    order.discountAmount = discountAmount;
    order.taxAmount = taxAmount;
    order.totalAmount = totalAmount;

    for (const item of order.items || []) {
        item.lineTotal = round2(item.qty * item.unitPrice);
    }
};

const assertEditable = (order) => {
    if (!order) {
        const error = new Error("POS order not found");
        error.statusCode = 404;
        throw error;
    }
    if (order.status === "PAID") {
        const error = new Error("POS order is already paid");
        error.statusCode = 400;
        throw error;
    }
    if (order.status === "CANCELLED") {
        const error = new Error("POS order is cancelled");
        error.statusCode = 400;
        throw error;
    }
};

const createPosOrder = async (payload, cashier) => {
    if (payload.customerId) {
        const c = await Customer.findById(payload.customerId);
        if (!c) {
            const error = new Error("Customer not found");
            error.statusCode = 404;
            throw error;
        }
    }

    
    let order;
    for (let attempt = 0; attempt < 5; attempt++) {
        const orderNumber = await generateCode("pos", "POS");
        try {
            order = await PosOrder.create({
                orderNumber,
                status: "DRAFT",
                customerId: payload.customerId || null,
                warehouseId: payload.warehouseId,
                companyId: payload.companyId || null,
                branchId: payload.branchId || null,
                cashierId: cashier?._id || null,
                items: [],
                shippingAmount: 0,
            });
            break;
        } catch (err) {
            const isDuplicateOrderNumber =
                err &&
                (err.code === 11000 || err.code === 11001) &&
                (err.keyPattern?.orderNumber ||
                    err.keyValue?.orderNumber ||
                    String(err.message || "").includes("orderNumber_1"));
            if (isDuplicateOrderNumber && attempt < 4) continue;
            throw err;
        }
    }

    computeTotals(order);
    await order.save();

    return PosOrder.findById(order._id).populate("customerId warehouseId cashierId");
};

const getPosOrders = async ({ status }) => {
    const filter = {};
    if (status) filter.status = status;
    return PosOrder.find(filter)
        .populate("customerId warehouseId cashierId")
        .sort({ createdAt: -1 });
};

const getPosOrderById = async (id) => {
    const order = await PosOrder.findById(id).populate(
        "customerId warehouseId cashierId items.productId"
    );
    if (!order) {
        const error = new Error("POS order not found");
        error.statusCode = 404;
        throw error;
    }
    return order;
};

const findProductByRef = async ({ productId, barcode }) => {
    if (productId) {
        const p = await Product.findById(productId);
        if (!p) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }
        return p;
    }

    const p = await Product.findOne({ barcode: String(barcode).trim() });
    if (!p) {
        const error = new Error("Product not found by barcode");
        error.statusCode = 404;
        throw error;
    }
    return p;
};

const reserveDelta = async ({ productId, warehouseId, deltaQty, referenceId, productType }) => {
    if (deltaQty === 0) return;

    let type = productType;
    if (!type) {
        const p = await Product.findById(productId);
        type = p?.productType;
    }

    if (type === "SERVICE" || type === "CONSUMABLE") return;

    if (deltaQty > 0) {
        await stockService.reserveStock({
            productId,
            warehouseId,
            qty: deltaQty,
            referenceType: "POS_ORDER",
            referenceId,
            notes: "POS reserve",
        });
    } else {
        await stockService.releaseStock({
            productId,
            warehouseId,
            qty: Math.abs(deltaQty),
            referenceType: "POS_ORDER",
            referenceId,
            notes: "POS release",
        });
    }
};

const addItem = async (orderId, payload) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);

    const product = await findProductByRef(payload);
    if (product.status && product.status !== "ACTIVE") {
        const error = new Error("Product is inactive");
        error.statusCode = 400;
        throw error;
    }

    const qtyToAdd = payload.qty || 1;
    const existing = (order.items || []).find(
        (it) => String(it.productId) === String(product._id)
    );

    if (existing) {
        const oldQty = existing.qty;
        existing.qty = round2(oldQty + qtyToAdd);
        existing.unitPrice = product.salesPrice || 0;
        existing.sku = product.sku || "";
        existing.productName = product.productName || "";
        existing.barcode = product.barcode || "";

        await reserveDelta({
            productId: String(product._id),
            warehouseId: String(order.warehouseId),
            deltaQty: qtyToAdd,
            referenceId: String(order._id),
            productType: product.productType,
        });
    } else {
        order.items.push({
            productId: product._id,
            sku: product.sku || "",
            productName: product.productName || "",
            barcode: product.barcode || "",
            qty: qtyToAdd,
            unitPrice: product.salesPrice || 0,
            lineTotal: 0,
        });

        await reserveDelta({
            productId: String(product._id),
            warehouseId: String(order.warehouseId),
            deltaQty: qtyToAdd,
            referenceId: String(order._id),
            productType: product.productType,
        });
    }

    computeTotals(order);
    await order.save();
    return getPosOrderById(order._id);
};

const updateItemQty = async (orderId, itemId, { qty }) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);

    const item = (order.items || []).id(itemId);
    if (!item) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    const delta = round2(qty - item.qty);
    item.qty = qty;

    await reserveDelta({
        productId: String(item.productId),
        warehouseId: String(order.warehouseId),
        deltaQty: delta,
        referenceId: String(order._id),
    });

    computeTotals(order);
    await order.save();
    return getPosOrderById(order._id);
};

const removeItem = async (orderId, itemId) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);

    const item = (order.items || []).id(itemId);
    if (!item) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    await reserveDelta({
        productId: String(item.productId),
        warehouseId: String(order.warehouseId),
        deltaQty: -item.qty,
        referenceId: String(order._id),
    });

    item.deleteOne();
    computeTotals(order);
    await order.save();
    return getPosOrderById(order._id);
};

const setDiscount = async (orderId, discount) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);
    order.discount = discount;
    computeTotals(order);
    await order.save();
    return getPosOrderById(order._id);
};

const setTax = async (orderId, tax) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);
    order.tax = tax;
    computeTotals(order);
    await order.save();
    return getPosOrderById(order._id);
};

const setShipping = async (orderId, shippingAmount) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);
    order.shippingAmount = shippingAmount;
    computeTotals(order);
    await order.save();
    return getPosOrderById(order._id);
};

const holdOrder = async (orderId, reference) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);
    order.status = "HELD";
    order.holdReference = reference || order.holdReference || "";
    await order.save();
    return getPosOrderById(order._id);
};

const cancelOrder = async (orderId) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);

    for (const item of order.items || []) {
        await reserveDelta({
            productId: String(item.productId),
            warehouseId: String(order.warehouseId),
            deltaQty: -item.qty,
            referenceId: String(order._id),
        });
    }

    order.status = "CANCELLED";
    await order.save();
    return getPosOrderById(order._id);
};

const maskLast4 = (cardNumber) => {
    const digits = String(cardNumber || "").replace(/\D/g, "");
    if (digits.length < 4) return "";
    return digits.slice(-4);
};

const payOrder = async (orderId, payload, cashier) => {
    const order = await PosOrder.findById(orderId);
    assertEditable(order);

    if (!order.items || order.items.length === 0) {
        const error = new Error("Cannot pay an empty order");
        error.statusCode = 400;
        throw error;
    }

    if (order.status === "DRAFT") order.status = "DRAFT";
    computeTotals(order);

    const total = order.totalAmount || 0;
    const method = payload.method;

    const payment = {
        method,
        amount: total,
        amountReceived: 0,
        change: 0,
        cardBrand: "",
        last4: "",
        cardHolderName: "",
        device: "",
        authorized: false,
        transactionRef: payload.transactionRef || "",
        paidAt: new Date(),
    };

    if (method === "CASH") {
        const received = round2(payload.amountReceived || 0);
        if (received < total) {
            const error = new Error("Insufficient cash received");
            error.statusCode = 400;
            throw error;
        }
        payment.amountReceived = received;
        payment.change = round2(received - total);
        payment.authorized = true;
    } else if (method === "APPLE_PAY") {
        payment.device = payload.applePay?.device || "";
        payment.authorized = Boolean(payload.applePay?.authorized);
        if (!payment.authorized) {
            const error = new Error("Apple Pay authorization is required");
            error.statusCode = 400;
            throw error;
        }
    } else {
        payment.cardBrand = payload.card?.cardBrand || "";
        payment.cardHolderName = payload.card?.cardHolderName || "";
        payment.last4 = maskLast4(payload.card?.cardNumber);
        payment.authorized = true;
    }

    // Finalize stock: release reserved then stock out.
    for (const item of order.items || []) {
        await stockService.releaseStock({
            productId: String(item.productId),
            warehouseId: String(order.warehouseId),
            qty: item.qty,
            referenceType: "POS_ORDER",
            referenceId: String(order._id),
            notes: "POS pay release",
        });

        await stockService.stockOut({
            productId: String(item.productId),
            warehouseId: String(order.warehouseId),
            qty: item.qty,
            referenceType: "POS_ORDER",
            referenceId: String(order._id),
            notes: "POS sale",
        });
    }

    order.payments = [payment];
    order.status = "PAID";
    order.cashierId = cashier?._id || order.cashierId || null;
    order.paidAt = new Date();
    await order.save();

    eventBus.emitAsync(EVENTS.POS_ORDER_PAID, order.toObject());

    return getPosOrderById(order._id);
};

const getReceipt = async (orderId) => {
    const order = await PosOrder.findById(orderId).populate(
        "customerId cashierId warehouseId items.productId"
    );
    if (!order) {
        const error = new Error("POS order not found");
        error.statusCode = 404;
        throw error;
    }
    if (order.status !== "PAID") {
        const error = new Error("Receipt is only available for paid orders");
        error.statusCode = 400;
        throw error;
    }

    return {
        orderNumber: order.orderNumber,
        paidAt: order.paidAt,
        customer: order.customerId
            ? {
                id: order.customerId._id,
                name: order.customerId.customerName,
                phone: order.customerId.phoneNumber,
                email: order.customerId.email,
            }
            : null,
        cashier: order.cashierId
            ? { id: order.cashierId._id, username: order.cashierId.username, email: order.cashierId.email }
            : null,
        items: (order.items || []).map((it) => ({
            productId: it.productId?._id || it.productId,
            name: it.productName,
            qty: it.qty,
            unitPrice: it.unitPrice,
            total: it.lineTotal,
        })),
        totals: {
            subtotal: order.subtotal,
            discount: order.discountAmount,
            tax: order.taxAmount,
            shipping: order.shippingAmount,
            totalPayable: order.totalAmount,
        },
        payment: order.payments?.[0] || null,
    };
};

module.exports = {
    createPosOrder,
    getPosOrders,
    getPosOrderById,
    addItem,
    updateItemQty,
    removeItem,
    setDiscount,
    setTax,
    setShipping,
    holdOrder,
    cancelOrder,
    payOrder,
    getReceipt,
};

