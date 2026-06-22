/**
 * Calculates the status of an AR/AP invoice based on amount, paid amount, and due date.
 * @param {number} amount - Total invoice amount
 * @param {number} paidAmount - Total amount paid so far
 * @param {Date|string} dueDate - The due date of the invoice
 * @returns {string} - Status: "PAID", "PARTIAL", "OVERDUE", or "PENDING"
 */
const calculateInvoiceStatus = (amount, paidAmount, dueDate) => {

    const roundedAmount = Math.round(amount * 100) / 100;
    const roundedPaid = Math.round(paidAmount * 100) / 100;

    if (roundedPaid >= roundedAmount) return "PAID";
    if (roundedPaid > 0) return "PARTIAL";

    const now = new Date();
    // Set both dates to midnight to compare only the date part
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const due = new Date(dueDate);
    const dueMidnight = new Date(due.getFullYear(), due.getMonth(), due.getDate());

    if (dueMidnight < today) return "OVERDUE";
    return "PENDING";
};

module.exports = {
    calculateInvoiceStatus,
};
