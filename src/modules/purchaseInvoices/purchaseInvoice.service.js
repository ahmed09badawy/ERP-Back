const PurchaseInvoice = require("./purchaseInvoice.model");
const Supplier = require("../suppliers/supplier.model");
const Product = require("../products/product.model");
const PurchaseOrder = require("../purchaseOrders/purchaseOrder.model");
const generateCode = require("../../common/utils/generate-code");
const eventBus = require("../../common/events/eventBus");
const EVENTS = require("../../common/events/eventTypes");

const createPurchaseInvoice = async (payload) => {
    const invoiceNo = await generateCode("purchase_invoice", "PINV");

    const supplier = await Supplier.findById(payload.supplierId);
    if (!supplier) {
        const error = new Error("Supplier not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.purchaseOrderId) {
        const po = await PurchaseOrder.findById(payload.purchaseOrderId);
        if (!po) {
            const error = new Error("Purchase order not found");
            error.statusCode = 404;
            throw error;
        }
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

        const lineSubtotal = item.quantity * item.unitCost;
        subtotal += lineSubtotal;
        taxAmount += item.tax || 0;

        items.push({
            productId: item.productId,
            sku: item.sku || product.sku,
            quantity: item.quantity,
            unitCost: item.unitCost,
            tax: item.tax || 0,
            total: lineSubtotal + (item.tax || 0),
        });
    }

    const discountAmount = payload.discountAmount || 0;
    const totalAmount = subtotal + taxAmount - discountAmount;

    const invoice = await PurchaseInvoice.create({
        invoiceNo,
        supplierId: payload.supplierId,
        purchaseOrderId: payload.purchaseOrderId || null,
        invoiceDate: payload.invoiceDate || new Date(),
        dueDate: payload.dueDate || null,
        warehouseId: payload.warehouseId || null,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
        items,
        paymentStatus: payload.paymentStatus || "UNPAID",
        deliveryStatus: payload.deliveryStatus || "PROCESSING",
        subtotal,
        taxAmount,
        discountAmount,
        totalAmount,
        notes: payload.notes || "",
    });

    eventBus.emitAsync(EVENTS.PURCHASE_INVOICE_POSTED, invoice.toObject());

    return PurchaseInvoice.findById(invoice._id).populate(
        "supplierId purchaseOrderId warehouseId companyId branchId items.productId"
    );
};

const getPurchaseInvoices = async () => {
    return PurchaseInvoice.find()
        .populate("supplierId purchaseOrderId warehouseId companyId branchId items.productId")
        .sort({ createdAt: -1 });
};

const getPurchaseInvoiceById = async (id) => {
    const invoice = await PurchaseInvoice.findById(id)
        .populate("supplierId purchaseOrderId warehouseId companyId branchId items.productId");

    if (!invoice) {
        const error = new Error("Purchase invoice not found");
        error.statusCode = 404;
        throw error;
    }

    return invoice;
};

const deletePurchaseInvoice = async (id) => {
    const invoice = await PurchaseInvoice.findByIdAndDelete(id);
    if (!invoice) {
        const error = new Error("Purchase invoice not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Purchase invoice deleted successfully" };
};

const updatePurchaseInvoice = async (id, payload) => {
    const invoice = await PurchaseInvoice.findById(id);
    if (!invoice) {
        const error = new Error("Purchase invoice not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.supplierId) {
        const supplier = await Supplier.findById(payload.supplierId);
        if (!supplier) {
            const error = new Error("Supplier not found");
            error.statusCode = 404;
            throw error;
        }
    }

    if (payload.purchaseOrderId) {
        const po = await PurchaseOrder.findById(payload.purchaseOrderId);
        if (!po) {
            const error = new Error("Purchase order not found");
            error.statusCode = 404;
            throw error;
        }
    }

    let subtotal = invoice.subtotal;
    let taxAmount = invoice.taxAmount;
    let items = invoice.items;

    if (payload.items) {
        subtotal = 0;
        taxAmount = 0;
        items = [];
        for (const item of payload.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                const error = new Error("Product not found");
                error.statusCode = 404;
                throw error;
            }

            const lineSubtotal = item.quantity * item.unitCost;
            subtotal += lineSubtotal;
            taxAmount += item.tax || 0;

            items.push({
                productId: item.productId,
                sku: item.sku || product.sku,
                quantity: item.quantity,
                unitCost: item.unitCost,
                tax: item.tax || 0,
                total: lineSubtotal + (item.tax || 0),
            });
        }
    }

    const discountAmount = payload.discountAmount !== undefined ? payload.discountAmount : invoice.discountAmount;
    const totalAmount = subtotal + taxAmount - discountAmount;

    const updatedInvoice = await PurchaseInvoice.findByIdAndUpdate(
        id,
        {
            ...payload,
            items,
            subtotal,
            taxAmount,
            discountAmount,
            totalAmount,
        },
        { returnDocument: "after" }
    ).populate("supplierId purchaseOrderId warehouseId companyId branchId items.productId");

    return updatedInvoice;
};

module.exports = {
    createPurchaseInvoice,
    getPurchaseInvoices,
    getPurchaseInvoiceById,
    updatePurchaseInvoice,
    deletePurchaseInvoice,
};
