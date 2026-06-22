const Quotation = require("./quotation.model");
const Customer = require("../customers/customer.model");
const Product = require("../products/product.model");
const generateCode = require("../../common/utils/generate-code");

const buildQuotationItems = async (itemsPayload) => {
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

        const unitPrice = product.salesPrice || 0;
        const lineSubtotal = item.qty * unitPrice;
        const lineDiscount = item.discount || 0;
        const lineTax = 0;
        const lineTotal = lineSubtotal - lineDiscount + lineTax;

        subtotal += lineSubtotal;
        discountAmount += lineDiscount;
        taxAmount += lineTax;

        items.push({
            productId: item.productId,
            productName: product.productName,
            qty: item.qty,
            unitPrice,
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

const createQuotation = async (payload, currentUserId) => {
    const quotationNo = await generateCode("quotation", "QUO");

    const customer = await Customer.findById(payload.customerId);

    if (!customer) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
    }

    const totals = await buildQuotationItems(payload.items);

    const quotation = await Quotation.create({
        quotationNo,
        customerId: payload.customerId,
        quotationDate: payload.quotationDate || new Date(),
        expirationDate: payload.expirationDate || null,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
        salespersonId: currentUserId || null,
        items: totals.items,
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        taxAmount: totals.taxAmount,
        totalAmount: totals.totalAmount,
        notes: payload.notes || "",
        termsAndConditions: payload.termsAndConditions || "",
        status: payload.status || "DRAFT",
    });

    return Quotation.findById(quotation._id).populate(
        "customerId companyId branchId salespersonId items.productId"
    );
};

const getQuotations = async () => {
    return Quotation.find()
        .populate("customerId companyId branchId salespersonId items.productId")
        .sort({ createdAt: -1 });
};

const getQuotationById = async (id) => {
    const quotation = await Quotation.findById(id).populate(
        "customerId companyId branchId salespersonId items.productId"
    );

    if (!quotation) {
        const error = new Error("Quotation not found");
        error.statusCode = 404;
        throw error;
    }

    return quotation;
};

const updateQuotation = async (id, payload) => {
    const quotation = await Quotation.findById(id);

    if (!quotation) {
        const error = new Error("Quotation not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.customerId !== undefined) {
        const customer = await Customer.findById(payload.customerId);

        if (!customer) {
            const error = new Error("Customer not found");
            error.statusCode = 404;
            throw error;
        }

        quotation.customerId = payload.customerId;
    }

    if (payload.quotationDate !== undefined) quotation.quotationDate = payload.quotationDate;
    if (payload.expirationDate !== undefined) quotation.expirationDate = payload.expirationDate || null;
    if (payload.companyId !== undefined) quotation.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) quotation.branchId = payload.branchId || null;
    if (payload.notes !== undefined) quotation.notes = payload.notes;
    if (payload.termsAndConditions !== undefined) quotation.termsAndConditions = payload.termsAndConditions;
    if (payload.status !== undefined) quotation.status = payload.status;

    if (payload.items !== undefined) {
        const totals = await buildQuotationItems(payload.items);

        quotation.items = totals.items;
        quotation.subtotal = totals.subtotal;
        quotation.discountAmount = totals.discountAmount;
        quotation.taxAmount = totals.taxAmount;
        quotation.totalAmount = totals.totalAmount;
    }

    await quotation.save();

    return Quotation.findById(quotation._id).populate(
        "customerId companyId branchId salespersonId items.productId"
    );
};

const deleteQuotation = async (id) => {
    const quotation = await Quotation.findById(id);

    if (!quotation) {
        const error = new Error("Quotation not found");
        error.statusCode = 404;
        throw error;
    }

    await Quotation.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createQuotation,
    getQuotations,
    getQuotationById,
    updateQuotation,
    deleteQuotation,
};
