const APPayment = require("./accountPayablePayments.model");
const AccountsPayable = require("../accountPayable/accountPayable.model");
const { isMonthClosed } = require("../monthlyClosing/monthlyClosing.service");
const { calculateInvoiceStatus } = require("../../../common/utils/finance");
const eventBus = require("../../../common/events/eventBus");
const EVENTS = require("../../../common/events/eventTypes");

const createAPPayment = async (payload) => {
    const closed = await isMonthClosed(payload.paymentDate);
    if (closed) {
        const error = new Error("Month is closed");
        error.statusCode = 400;
        throw error;
    }

    const invoice = await AccountsPayable.findById(payload.apInvoiceId);

    if (!invoice) {
        const error = new Error("AP invoice not found");
        error.statusCode = 404;
        throw error;
    }

    const remaining = invoice.amount - invoice.paidAmount;

    if (payload.amount > remaining) {
        const error = new Error("Payment exceeds remaining balance");
        error.statusCode = 400;
        throw error;
    }

    const payment = await APPayment.create({
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

    eventBus.emitAsync(EVENTS.AP_PAYMENT_SENT, {
        invoice: invoice.toObject(),
        payment: payment.toObject(),
    });

    return payment;
};

const getAllAPPayments = async () => {
    return APPayment.find()
        .populate("apInvoiceId")
        .sort({ createdAt: -1 });
};

const getAPPaymentById = async (id) => {
    const payment = await APPayment.findById(id).populate("apInvoiceId");

    if (!payment) {
        const error = new Error("AP payment not found");
        error.statusCode = 404;
        throw error;
    }

    return payment;
};

const updateAPPayment = async (id, payload) => {
    const payment = await APPayment.findById(id);

    if (!payment) {
        const error = new Error("AP payment not found");
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

    const invoice = await AccountsPayable.findById(payment.apInvoiceId);

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

const deleteAPPayment = async (id) => {
    const payment = await APPayment.findById(id);

    if (!payment) {
        const error = new Error("AP payment not found");
        error.statusCode = 404;
        throw error;
    }

    const closed = await isMonthClosed(payment.paymentDate);
    if (closed) {
        const error = new Error("Cannot delete payment in closed month");
        error.statusCode = 400;
        throw error;
    }

    const invoice = await AccountsPayable.findById(payment.apInvoiceId);

    invoice.paidAmount -= payment.amount;
    invoice.status = calculateInvoiceStatus(
        invoice.amount,
        invoice.paidAmount,
        invoice.dueDate
    );

    await invoice.save();
    await APPayment.findByIdAndDelete(id);

    return { message: "AP payment deleted successfully" };
};

module.exports = {
    createAPPayment,
    getAllAPPayments,
    getAPPaymentById,
    updateAPPayment,
    deleteAPPayment,
};
