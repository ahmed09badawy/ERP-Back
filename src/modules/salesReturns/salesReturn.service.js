const SalesReturn = require("./salesReturn.model");
const SalesInvoice = require("../salesInvoices/salesInvoice.model");
const Customer = require("../customers/customer.model");
const Product = require("../products/product.model");
const Warehouse = require("../warehouses/warehouse.model");
const stockService = require("../stock/stock.service");
const generateCode = require("../../common/utils/generate-code");
const eventBus = require("../../common/events/eventBus");
const EVENTS = require("../../common/events/eventTypes");

const validateSalesReturnRefs = async (payload) => {
    const invoice = await SalesInvoice.findById(payload.originalInvoiceId);

    if (!invoice) {
        const error = new Error("Original sales invoice not found");
        error.statusCode = 404;
        throw error;
    }

    const customer = await Customer.findById(payload.customerId);

    if (!customer) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
    }

    const warehouse = await Warehouse.findById(payload.warehouseId);

    if (!warehouse) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
    }

    return invoice;
};

const buildSalesReturnItems = async (payload) => {
    const invoice = await validateSalesReturnRefs(payload);
    const items = [];

    for (const item of payload.items) {
        const product = await Product.findById(item.productId);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        const invoiceItem = invoice.items.find(
            (x) => x.productId.toString() === item.productId.toString()
        );

        if (!invoiceItem) {
            const error = new Error("Product does not exist in original invoice");
            error.statusCode = 400;
            throw error;
        }

        if (item.returnQuantity > invoiceItem.quantity) {
            const error = new Error("Return quantity exceeds invoiced quantity");
            error.statusCode = 400;
            throw error;
        }

        items.push({
            productId: item.productId,
            sku: item.sku || invoiceItem.sku,
            invoicedQuantity: item.invoicedQuantity || invoiceItem.quantity,
            returnQuantity: item.returnQuantity,
            unitPrice: item.unitPrice || invoiceItem.unitPrice,
            reasonForReturn: item.reasonForReturn,
            totalReturnAmount:
                item.returnQuantity * (item.unitPrice || invoiceItem.unitPrice),
        });
    }

    return items;
};

const applyStockIn = async (salesReturn) => {
    for (const item of salesReturn.items) {
        await stockService.stockIn({
            productId: item.productId,
            warehouseId: salesReturn.warehouseId,
            qty: item.returnQuantity,
            unitCost: item.unitPrice,
            referenceType: "sales_return",
            referenceId: salesReturn.returnNumber,
            notes: item.reasonForReturn,
        });
    }
};

const createSalesReturn = async (payload) => {
    const returnNumber = await generateCode("sales_return", "SRT");

    const items = await buildSalesReturnItems(payload);

    const salesReturn = await SalesReturn.create({
        returnNumber,
        originalInvoiceId: payload.originalInvoiceId,
        customerId: payload.customerId,
        warehouseId: payload.warehouseId,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
        returnDate: payload.returnDate || new Date(),
        items,
        refundStatus: payload.refundStatus || "PENDING",
        notes: payload.notes || "",
    });

    await applyStockIn(salesReturn);

    eventBus.emitAsync(EVENTS.SALES_RETURN_POSTED, salesReturn.toObject());

    return SalesReturn.findById(salesReturn._id).populate(
        "originalInvoiceId customerId warehouseId companyId branchId items.productId"
    );
};

const getSalesReturns = async () => {
    return SalesReturn.find()
        .populate("originalInvoiceId customerId warehouseId companyId branchId items.productId")
        .sort({ createdAt: -1 });
};

const getSalesReturnById = async (id) => {
    const salesReturn = await SalesReturn.findById(id).populate(
        "originalInvoiceId customerId warehouseId companyId branchId items.productId"
    );

    if (!salesReturn) {
        const error = new Error("Sales return not found");
        error.statusCode = 404;
        throw error;
    }

    return salesReturn;
};

const updateSalesReturn = async (id, payload) => {
    const salesReturn = await SalesReturn.findById(id);

    if (!salesReturn) {
        const error = new Error("Sales return not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.originalInvoiceId !== undefined)
        salesReturn.originalInvoiceId = payload.originalInvoiceId;
    if (payload.customerId !== undefined)
        salesReturn.customerId = payload.customerId;
    if (payload.warehouseId !== undefined)
        salesReturn.warehouseId = payload.warehouseId;
    if (payload.companyId !== undefined)
        salesReturn.companyId = payload.companyId || null;
    if (payload.branchId !== undefined)
        salesReturn.branchId = payload.branchId || null;
    if (payload.returnDate !== undefined)
        salesReturn.returnDate = payload.returnDate;
    if (payload.refundStatus !== undefined)
        salesReturn.refundStatus = payload.refundStatus;
    if (payload.notes !== undefined)
        salesReturn.notes = payload.notes;

    if (payload.items !== undefined) {
        salesReturn.items = await buildSalesReturnItems({
            originalInvoiceId:
                payload.originalInvoiceId || salesReturn.originalInvoiceId,
            customerId: payload.customerId || salesReturn.customerId,
            warehouseId: payload.warehouseId || salesReturn.warehouseId,
            items: payload.items,
        });
    }

    await salesReturn.save();

    return SalesReturn.findById(salesReturn._id).populate(
        "originalInvoiceId customerId warehouseId companyId branchId items.productId"
    );
};

const deleteSalesReturn = async (id) => {
    const salesReturn = await SalesReturn.findById(id);

    if (!salesReturn) {
        const error = new Error("Sales return not found");
        error.statusCode = 404;
        throw error;
    }

    await SalesReturn.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createSalesReturn,
    getSalesReturns,
    getSalesReturnById,
    updateSalesReturn,
    deleteSalesReturn,
};
