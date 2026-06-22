const mongoose = require("mongoose");

const apPaymentSchema = new mongoose.Schema(
    {
        apInvoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AccountsPayable",
            required: true,
        },
        paymentDate: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentMethod: {
            type: String,
            enum: ["CASH", "BANK_TRANSFER", "CARD", "CHEQUE"],
            default: "CASH",
        },
        referenceNumber: {
            type: String,
            trim: true,
            uppercase: true,
            default: "",
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("APPayment", apPaymentSchema);
