const PurchaseOrder = require("./purchaseOrder.model");
const Product = require("../products/product.model");
const Supplier = require("../suppliers/supplier.model");
const generateCode = require("../../common/utils/generate-code");
const eventBus = require("../../common/events/eventBus");
const EVENTS = require("../../common/events/eventTypes");

const createPurchaseOrder = async (payload) => {
    const referenceNo = await generateCode("purchase_order", "PO");

    const supplier = await Supplier.findById(payload.supplierId);
    if (!supplier) {
        const error = new Error("Supplier not found");
        error.statusCode = 404;
        throw error;
    }

    let subtotal = 0;
    let taxAmount = 0;

    const items = [];
    for (const item of payload.items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        subtotal += item.quantity * item.unitCost;
        taxAmount += item.tax || 0;

        items.push({
            productId: item.productId,
            sku: item.sku || product.sku,
            quantity: item.quantity,
            unitCost: item.unitCost,
            tax: item.tax || 0,
            receivedQuantity: 0,
            pendingQuantity: item.quantity,
        });
    }

    const po = await PurchaseOrder.create({
        referenceNo,
        supplierId: payload.supplierId,
        linkedPurchaseRequestId: payload.linkedPurchaseRequestId || null,
        orderDate: payload.orderDate || new Date(),
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
        items,
        paymentStatus: payload.paymentStatus || "UNPAID",
        deliveryStatus: "PENDING",
        subtotal,
        taxAmount,
        totalAmount: subtotal + taxAmount,
        notes: payload.notes || "",
    });

    eventBus.emitAsync(EVENTS.PURCHASE_ORDER_CREATED, po.toObject());

    return PurchaseOrder.findById(po._id).populate(
        "supplierId linkedPurchaseRequestId companyId branchId items.productId"
    );
};

const getPurchaseOrders = async () => {
    return PurchaseOrder.find()
        .populate("supplierId linkedPurchaseRequestId companyId branchId items.productId")
        .sort({ createdAt: -1 });
};

const getPurchaseOrderById = async (id) => {
    const po = await PurchaseOrder.findById(id)
        .populate("supplierId linkedPurchaseRequestId companyId branchId items.productId");

    if (!po) {
        const error = new Error("Purchase order not found");
        error.statusCode = 404;
        throw error;
    }

    return po;
};

const deletePurchaseOrder = async (id) => {
    const po = await PurchaseOrder.findByIdAndDelete(id);
    if (!po) {
        const error = new Error("Purchase order not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Purchase order deleted successfully" };
};

const updatePurchaseOrder = async (id, payload) => {
    const po = await PurchaseOrder.findById(id);
    if (!po) {
        const error = new Error("Purchase order not found");
        error.statusCode = 404;
        throw error;
    }

    // If items are updated, recompute totals and reset item pending quantities.
    if (payload.supplierId) {
        const supplier = await Supplier.findById(payload.supplierId);
        if (!supplier) {
            const error = new Error("Supplier not found");
            error.statusCode = 404;
            throw error;
        }
        po.supplierId = payload.supplierId;
    }

    if (payload.linkedPurchaseRequestId !== undefined) {
        po.linkedPurchaseRequestId = payload.linkedPurchaseRequestId || null;
    }
    if (payload.orderDate) po.orderDate = new Date(payload.orderDate);
    if (payload.companyId !== undefined) po.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) po.branchId = payload.branchId || null;
    if (payload.paymentStatus) po.paymentStatus = payload.paymentStatus;
    if (payload.deliveryStatus) po.deliveryStatus = payload.deliveryStatus;
    if (payload.notes !== undefined) po.notes = payload.notes || "";

    if (payload.items) {
        let subtotal = 0;
        let taxAmount = 0;
        const items = [];

        for (const item of payload.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                const error = new Error("Product not found");
                error.statusCode = 404;
                throw error;
            }

            subtotal += item.quantity * item.unitCost;
            taxAmount += item.tax || 0;

            items.push({
                productId: item.productId,
                sku: item.sku || product.sku,
                quantity: item.quantity,
                unitCost: item.unitCost,
                tax: item.tax || 0,
                receivedQuantity: 0,
                pendingQuantity: item.quantity,
            });
        }

        po.items = items;
        po.subtotal = subtotal;
        po.taxAmount = taxAmount;
        po.totalAmount = subtotal + taxAmount;
    }

    await po.save();
    return PurchaseOrder.findById(po._id).populate(
        "supplierId linkedPurchaseRequestId companyId branchId items.productId"
    );
};

module.exports = {
    createPurchaseOrder,
    getPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder,
};
