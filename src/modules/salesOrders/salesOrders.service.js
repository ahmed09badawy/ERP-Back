const SalesOrder = require("./salesOrders.model");
const Customer = require("../customers/customer.model");
const Product = require("../products/product.model");
const Warehouse = require("../warehouses/warehouse.model");
const stockService = require("../stock/stock.service");
const pricingService = require("../pricingRules/pricingRules.service");
const discountService = require("../discounts/discount.service");
const promotionService = require("../promotions/promotion.service");
const generateCode = require("../../common/utils/generate-code");
const eventBus = require("../../common/events/eventBus");
const EVENTS = require("../../common/events/eventTypes");
const stockIntegration = require("../../common/integrations/stockIntegration.service");

const buildSalesOrderItems = async (payload) => {
    let subtotal = 0;
    let discountAmount = 0;
    let taxAmount = 0;
    const items = [];

    for (const item of payload.items) {
        const product = await Product.findById(item.productId);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        const price = await pricingService.applyPricingRule({
            productId: item.productId,
            customerId: payload.customerId,
            quantity: item.quantity,
            basePrice: item.unitPrice,
        });

        const lineSubtotal = item.quantity * price;

        const dynamicDiscount = await discountService.applyDiscount({
            productId: item.productId,
            customerId: payload.customerId,
            orderTotal: lineSubtotal,
            lineTotal: lineSubtotal,
        });

        const promotionBenefit = await promotionService.applyPromotion({
            productId: item.productId,
            customerId: payload.customerId,
            quantity: item.quantity,
            orderTotal: lineSubtotal,
            promoCode: payload.promoCode || "",
            lineTotal: lineSubtotal,
        });

        let lineDiscount =
            (dynamicDiscount || 0) +
            (promotionBenefit || 0) +
            (item.discount || 0);

        if (lineDiscount > lineSubtotal) {
            lineDiscount = lineSubtotal;
        }

        if (lineDiscount < 0) {
            lineDiscount = 0;
        }

        const lineTax = item.tax || 0;

        let lineTotal = lineSubtotal - lineDiscount + lineTax;

        if (lineTotal < 0) {
            lineTotal = 0;
        }

        subtotal += lineSubtotal;
        discountAmount += lineDiscount;
        taxAmount += lineTax;

        items.push({
            productId: item.productId,
            sku: item.sku || product.sku,
            quantity: item.quantity,
            unitPrice: price,
            discount: lineDiscount,
            tax: lineTax,
            total: lineTotal,
        });
    }

    const totalAmount = subtotal - discountAmount + taxAmount;

    return {
        items,
        subtotal,
        discountAmount,
        taxAmount,
        totalAmount: totalAmount < 0 ? 0 : totalAmount,
    };
};

const validateCustomerAndWarehouse = async (payload) => {
    if (payload.customerId) {
        const customer = await Customer.findById(payload.customerId);

        if (!customer) {
            const error = new Error("Customer not found");
            error.statusCode = 404;
            throw error;
        }
    }

    if (payload.warehouseId) {
        const warehouse = await Warehouse.findById(payload.warehouseId);

        if (!warehouse) {
            const error = new Error("Warehouse not found");
            error.statusCode = 404;
            throw error;
        }
    }
};

const reserveOrderStock = async (order) => {
    if (order.status === "DRAFT" || !order.warehouseId) return;

    for (const item of order.items) {
        await stockService.reserveStock({
            productId: item.productId,
            warehouseId: order.warehouseId,
            qty: item.quantity,
            referenceType: "sales_order",
            referenceId: order.orderNo,
            notes: order.notes || "",
        });
    }
};

const createSalesOrder = async (payload, currentUserId) => {
    const orderNo = await generateCode("sales_order", "SO");

    await validateCustomerAndWarehouse(payload);

    const totals = await buildSalesOrderItems(payload);

    const salesOrder = await SalesOrder.create({
        orderNo,
        customerId: payload.customerId,
        orderDate: payload.orderDate || new Date(),
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
        warehouseId: payload.warehouseId || null,
        salespersonId: currentUserId || null,
        items: totals.items,
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        taxAmount: totals.taxAmount,
        totalAmount: totals.totalAmount,
        paymentStatus: payload.paymentStatus || "UNPAID",
        deliveryStatus: payload.deliveryStatus || "PENDING",
        status: payload.status || "CONFIRMED",
        notes: payload.notes || "",
        promoCode: payload.promoCode || "",
    });

    await reserveOrderStock(salesOrder);

    if (salesOrder.status !== "DRAFT") {
        eventBus.emitAsync(EVENTS.SALES_ORDER_CONFIRMED, salesOrder.toObject());
    }

    return SalesOrder.findById(salesOrder._id).populate(
        "customerId companyId branchId warehouseId salespersonId items.productId"
    );
};

const getSalesOrders = async () => {
    return SalesOrder.find()
        .populate("customerId companyId branchId warehouseId salespersonId items.productId")
        .sort({ createdAt: -1 });
};

const getSalesOrderById = async (id) => {
    const order = await SalesOrder.findById(id).populate(
        "customerId companyId branchId warehouseId salespersonId items.productId"
    );

    if (!order) {
        const error = new Error("Sales order not found");
        error.statusCode = 404;
        throw error;
    }

    return order;
};

const updateSalesOrder = async (id, payload) => {
    const order = await SalesOrder.findById(id);

    if (!order) {
        const error = new Error("Sales order not found");
        error.statusCode = 404;
        throw error;
    }

    const previousSnapshot = order.toObject();

    await validateCustomerAndWarehouse({
        customerId: payload.customerId,
        warehouseId: payload.warehouseId,
    });

    if (payload.customerId !== undefined) order.customerId = payload.customerId;
    if (payload.orderDate !== undefined) order.orderDate = payload.orderDate;
    if (payload.companyId !== undefined) order.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) order.branchId = payload.branchId || null;
    if (payload.warehouseId !== undefined) order.warehouseId = payload.warehouseId || null;
    if (payload.paymentStatus !== undefined) order.paymentStatus = payload.paymentStatus;
    if (payload.deliveryStatus !== undefined) order.deliveryStatus = payload.deliveryStatus;
    if (payload.status !== undefined) order.status = payload.status;
    if (payload.notes !== undefined) order.notes = payload.notes;
    if (payload.promoCode !== undefined) order.promoCode = payload.promoCode;

    if (payload.items !== undefined) {
        const totals = await buildSalesOrderItems({
            ...payload,
            customerId: payload.customerId || order.customerId,
            promoCode: payload.promoCode || order.promoCode,
        });

        order.items = totals.items;
        order.subtotal = totals.subtotal;
        order.discountAmount = totals.discountAmount;
        order.taxAmount = totals.taxAmount;
        order.totalAmount = totals.totalAmount;
    }

    const itemsChanged = payload.items !== undefined;
    const statusChanged = payload.status !== undefined;
    const warehouseChanged = payload.warehouseId !== undefined;

    if (order.status === "CANCELLED") {
        eventBus.emitAsync(EVENTS.SALES_ORDER_CANCELLED, order.toObject());
    } else if (itemsChanged || warehouseChanged) {
        await stockIntegration.reconcileSalesOrderReservations(previousSnapshot, order);
    }

    await order.save();

    return SalesOrder.findById(order._id).populate(
        "customerId companyId branchId warehouseId salespersonId items.productId"
    );
};

const deleteSalesOrder = async (id) => {
    const order = await SalesOrder.findById(id);

    if (!order) {
        const error = new Error("Sales order not found");
        error.statusCode = 404;
        throw error;
    }

    eventBus.emitAsync(EVENTS.SALES_ORDER_CANCELLED, order.toObject());
    await SalesOrder.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createSalesOrder,
    getSalesOrders,
    getSalesOrderById,
    updateSalesOrder,
    deleteSalesOrder,
};
