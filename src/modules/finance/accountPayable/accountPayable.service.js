const AccountsPayable = require("./accountPayable.model");
const { isMonthClosed } = require("../monthlyClosing/monthlyClosing.service");
const { calculateInvoiceStatus } = require("../../../common/utils/finance");

const createAP = async (payload) => {
    const closed = await isMonthClosed(payload.invoiceDate);
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    const existing = await AccountsPayable.findOne({
        invoiceNumber: payload.invoiceNumber.toUpperCase(),
    });

    if (existing) {
        const error = new Error("Invoice number already exists");
        error.statusCode = 400;
        throw error;
    }

    const status = calculateInvoiceStatus(
        payload.amount,
        payload.paidAmount || 0,
        payload.dueDate
    );

    return AccountsPayable.create({
        ...payload,
        invoiceNumber: payload.invoiceNumber.toUpperCase(),
        paidAmount: payload.paidAmount || 0,
        status,
    });
};

const getAllAP = async () => {
    const invoices = await AccountsPayable.find().sort({ createdAt: -1 });
    return invoices.map((invoice) => {
        invoice.status = calculateInvoiceStatus(
            invoice.amount,
            invoice.paidAmount,
            invoice.dueDate
        );
        return invoice;
    });
};

const getAPById = async (id) => {
    const invoice = await AccountsPayable.findById(id);

    if (!invoice) {
        const error = new Error("AP invoice not found");
        error.statusCode = 404;
        throw error;
    }

    invoice.status = calculateInvoiceStatus(
        invoice.amount,
        invoice.paidAmount,
        invoice.dueDate
    );

    return invoice;
};

const updateAP = async (id, payload) => {
    const invoice = await AccountsPayable.findById(id);

    if (!invoice) {
        const error = new Error("AP invoice not found");
        error.statusCode = 404;
        throw error;
    }

    const dateToCheck = payload.invoiceDate || invoice.invoiceDate;

    const closed = await isMonthClosed(dateToCheck);
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    Object.assign(invoice, payload);

    invoice.status = calculateInvoiceStatus(
        invoice.amount,
        invoice.paidAmount,
        invoice.dueDate
    );

    await invoice.save();
    return invoice;
};

const deleteAP = async (id) => {
    const invoice = await AccountsPayable.findById(id);

    if (!invoice) {
        const error = new Error("AP invoice not found");
        error.statusCode = 404;
        throw error;
    }


    const closed = await isMonthClosed(invoice.invoiceDate);
    if (closed) {
        const error = new Error("Cannot delete invoice in closed month");
        error.statusCode = 400;
        throw error;
    }

    await AccountsPayable.findByIdAndDelete(id);

    return { message: "AP invoice deleted successfully" };
};

module.exports = {
    createAP,
    getAllAP,
    getAPById,
    updateAP,
    deleteAP,
};
