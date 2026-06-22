const SalesInvoice = require("./salesInvoice.model");
const SalesOrder = require("../salesOrders/salesOrders.model");
const Customer = require("../customers/customer.model");
const Product = require("../products/product.model");
const stockService = require("../stock/stock.service");
const generateCode = require("../../common/utils/generate-code");
const eventBus = require("../../common/events/eventBus");
const EVENTS = require("../../common/events/eventTypes");
const stockIntegration = require("../../common/integrations/stockIntegration.service");

const buildInvoiceItems = async (itemsPayload) => {
    let subtotal = 0;
    let discountAmount = 0;
    let taxAmount = 0;
    const items = [];

    for (const item of itemsPayload) {
        const product = await Product.findById(item.productId);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        const lineSubtotal = item.quantity * item.unitPrice;
        const lineDiscount = item.discount || 0;
        const lineTax = item.tax || 0;
        const lineTotal = lineSubtotal - lineDiscount + lineTax;

        subtotal += lineSubtotal;
        discountAmount += lineDiscount;
        taxAmount += lineTax;

        items.push({
            productId: item.productId,
            sku: item.sku || product.sku,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discount: lineDiscount,
            tax: lineTax,
            total: lineTotal,
        });
    }

    return {
        items,
        subtotal,
        discountAmount,
        taxAmount,
        totalAmount: subtotal - discountAmount + taxAmount,
    };
};

const updateRelatedSalesOrder = async (salesOrderId, paymentStatus) => {
    if (!salesOrderId) return;

    const salesOrder = await SalesOrder.findById(salesOrderId);

    if (!salesOrder) {
        const error = new Error("Sales order not found");
        error.statusCode = 404;
        throw error;
    }

    salesOrder.deliveryStatus = "DELIVERED";

    if (paymentStatus) {
        salesOrder.paymentStatus = paymentStatus;
    }

    await salesOrder.save();
};

const applyStockOut = async (invoice) => {
    if (!invoice.warehouseId) return;

    for (const item of invoice.items) {
        await stockService.releaseStock({
            productId: item.productId,
            warehouseId: invoice.warehouseId,
            qty: item.quantity,
            referenceType: "sales_order_invoice",
            referenceId: invoice.invoiceNumber,
            notes: invoice.notes || "",
        });

        await stockService.stockOut({
            productId: item.productId,
            warehouseId: invoice.warehouseId,
            qty: item.quantity,
            referenceType: "sales_invoice",
            referenceId: invoice.invoiceNumber,
            notes: invoice.notes || "",
        });
    }
};

const createSalesInvoice = async (payload, currentUserId) => {
    const invoiceNumber = await generateCode("sales_invoice", "SINV");

    const customer = await Customer.findById(payload.customerId);

    if (!customer) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.salesOrderId) {
        const salesOrder = await SalesOrder.findById(payload.salesOrderId);

        if (!salesOrder) {
            const error = new Error("Sales order not found");
            error.statusCode = 404;
            throw error;
        }
    }

    const totals = await buildInvoiceItems(payload.items);

    const invoice = await SalesInvoice.create({
        invoiceNumber,
        salesOrderId: payload.salesOrderId || null,
        customerId: payload.customerId,
        warehouseId: payload.warehouseId || null,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
        salespersonId: currentUserId || null,
        issuedDate: payload.issuedDate || new Date(),
        dueDate: payload.dueDate || null,
        items: totals.items,
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        taxAmount: totals.taxAmount,
        totalAmount: totals.totalAmount,
        paymentStatus: payload.paymentStatus || "UNPAID",
        notes: payload.notes || "",
    });

    await applyStockOut(invoice);
    await updateRelatedSalesOrder(invoice.salesOrderId, invoice.paymentStatus);

    eventBus.emitAsync(EVENTS.SALES_INVOICE_POSTED, invoice.toObject());

    return SalesInvoice.findById(invoice._id).populate(
        "salesOrderId customerId warehouseId companyId branchId salespersonId items.productId"
    );
};

const getSalesInvoices = async () => {
    return SalesInvoice.find()
        .populate("salesOrderId customerId warehouseId companyId branchId salespersonId items.productId")
        .sort({ createdAt: -1 });
};

const getSalesInvoiceById = async (id) => {
    const invoice = await SalesInvoice.findById(id).populate(
        "salesOrderId customerId warehouseId companyId branchId salespersonId items.productId"
    );

    if (!invoice) {
        const error = new Error("Sales invoice not found");
        error.statusCode = 404;
        throw error;
    }

    return invoice;
};

const updateSalesInvoice = async (id, payload) => {
    const invoice = await SalesInvoice.findById(id);

    if (!invoice) {
        const error = new Error("Sales invoice not found");
        error.statusCode = 404;
        throw error;
    }

    const previousItems = [...invoice.items];
    const previousWarehouseId = invoice.warehouseId;

    if (payload.customerId !== undefined) {
        const customer = await Customer.findById(payload.customerId);

        if (!customer) {
            const error = new Error("Customer not found");
            error.statusCode = 404;
            throw error;
        }

        invoice.customerId = payload.customerId;
    }

    if (payload.salesOrderId !== undefined) {
        if (payload.salesOrderId) {
            const salesOrder = await SalesOrder.findById(payload.salesOrderId);

            if (!salesOrder) {
                const error = new Error("Sales order not found");
                error.statusCode = 404;
                throw error;
            }
        }

        invoice.salesOrderId = payload.salesOrderId || null;
    }

    if (payload.warehouseId !== undefined) invoice.warehouseId = payload.warehouseId || null;
    if (payload.companyId !== undefined) invoice.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) invoice.branchId = payload.branchId || null;
    if (payload.issuedDate !== undefined) invoice.issuedDate = payload.issuedDate;
    if (payload.dueDate !== undefined) invoice.dueDate = payload.dueDate || null;
    if (payload.paymentStatus !== undefined) invoice.paymentStatus = payload.paymentStatus;
    if (payload.notes !== undefined) invoice.notes = payload.notes;

    if (payload.items !== undefined) {
        const totals = await buildInvoiceItems(payload.items);

        invoice.items = totals.items;
        invoice.subtotal = totals.subtotal;
        invoice.discountAmount = totals.discountAmount;
        invoice.taxAmount = totals.taxAmount;
        invoice.totalAmount = totals.totalAmount;
    }

    if (payload.items !== undefined && invoice.warehouseId) {
        await stockIntegration.reverseSalesInvoiceStock({
            invoiceNumber: invoice.invoiceNumber,
            warehouseId: previousWarehouseId || invoice.warehouseId,
            items: previousItems,
        });
    }

    await invoice.save();

    if (payload.items !== undefined && invoice.warehouseId) {
        await applyStockOut(invoice);
    }

    await updateRelatedSalesOrder(invoice.salesOrderId, invoice.paymentStatus);

    return SalesInvoice.findById(invoice._id).populate(
        "salesOrderId customerId warehouseId companyId branchId salespersonId items.productId"
    );
};

const deleteSalesInvoice = async (id) => {
    const invoice = await SalesInvoice.findById(id);

    if (!invoice) {
        const error = new Error("Sales invoice not found");
        error.statusCode = 404;
        throw error;
    }

    eventBus.emitAsync(EVENTS.SALES_INVOICE_DELETED, invoice.toObject());
    await SalesInvoice.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createSalesInvoice,
    getSalesInvoices,
    getSalesInvoiceById,
    updateSalesInvoice,
    deleteSalesInvoice,
};
