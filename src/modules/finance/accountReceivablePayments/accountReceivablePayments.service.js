const ARPayment = require("./accountReceivablePayments.model");
const AccountsReceivable = require("../accountReceivable/accountReceivable.model");
const { isMonthClosed } = require("../monthlyClosing/monthlyClosing.service");
const { calculateInvoiceStatus } = require("../../../common/utils/finance");
const eventBus = require("../../../common/events/eventBus");
const EVENTS = require("../../../common/events/eventTypes");

const createARPayment = async (payload) => {
    const closed = await isMonthClosed(payload.paymentDate);
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    const invoice = await AccountsReceivable.findById(payload.arInvoiceId);

    if (!invoice) {
        const error = new Error("AR invoice not found");
        error.statusCode = 404;
        throw error;
    }

    const remaining = invoice.amount - invoice.paidAmount;

    if (payload.amount > remaining) {
        const error = new Error("Payment exceeds remaining balance");
        error.statusCode = 400;
        throw error;
    }

    const payment = await ARPayment.create({
        ...payload,
        referenceNumber: payload.referenceNumber
            ? payload.referenceNumber.toUpperCase()
            : "",
    });

    invoice.paidAmount += payload.amount;
    invoice.status = calculateInvoiceStatus(
        invoice.amount,
        invoice.paidAmount,
        invoice.dueDate
    );

    await invoice.save();

    const populatedInvoice = await AccountsReceivable.findById(invoice._id).populate("contactId");
    eventBus.emitAsync(EVENTS.AR_PAYMENT_RECEIVED, {
        invoice: populatedInvoice.toObject(),
        payment: payment.toObject(),
    });

    return payment;
};

const getAllARPayments = async () => {
    return ARPayment.find()
        .populate("arInvoiceId")
        .sort({ createdAt: -1 });
};

const getARPaymentById = async (id) => {
    const payment = await ARPayment.findById(id).populate("arInvoiceId");

    if (!payment) {
        const error = new Error("AR payment not found");
        error.statusCode = 404;
        throw error;
    }

    return payment;
};

const updateARPayment = async (id, payload) => {
    const payment = await ARPayment.findById(id);

    if (!payment) {
        const error = new Error("AR payment not found");
        error.statusCode = 404;
        throw error;
    }

    const dateToCheck = payload.paymentDate || payment.paymentDate;
    const closed = await isMonthClosed(dateToCheck);
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    const invoice = await AccountsReceivable.findById(payment.arInvoiceId);

    invoice.paidAmount -= payment.amount;

    const newAmount = payload.amount ?? payment.amount;
    const remaining = invoice.amount - invoice.paidAmount;

    if (newAmount > remaining) {
        const error = new Error("Updated payment exceeds remaining balance");
        error.statusCode = 400;
        throw error;
    }

    payment.paymentDate = payload.paymentDate ?? payment.paymentDate;
    payment.amount = newAmount;
    payment.paymentMethod =
        payload.paymentMethod ?? payment.paymentMethod;
    payment.referenceNumber = payload.referenceNumber
        ? payload.referenceNumber.toUpperCase()
        : payment.referenceNumber;
    payment.notes = payload.notes ?? payment.notes;

    invoice.paidAmount += newAmount;
    invoice.status = calculateInvoiceStatus(
        invoice.amount,
        invoice.paidAmount,
        invoice.dueDate
    );

    await payment.save();
    await invoice.save();

    return payment;
};

const deleteARPayment = async (id) => {
    const payment = await ARPayment.findById(id);

    if (!payment) {
        const error = new Error("AR payment not found");
        error.statusCode = 404;
        throw error;
    }

    const closed = await isMonthClosed(payment.paymentDate);
    if (closed) {
        const error = new Error("Cannot delete payment in closed month");
        error.statusCode = 400;
        throw error;
    }

    const invoice = await AccountsReceivable.findById(payment.arInvoiceId);

    invoice.paidAmount -= payment.amount;
    invoice.status = calculateInvoiceStatus(
        invoice.amount,
        invoice.paidAmount,
        invoice.dueDate
    );

    await invoice.save();
    await ARPayment.findByIdAndDelete(id);

    return { message: "AR payment deleted successfully" };
};

module.exports = {
    createARPayment,
    getAllARPayments,
    getARPaymentById,
    updateARPayment,
    deleteARPayment,
};
