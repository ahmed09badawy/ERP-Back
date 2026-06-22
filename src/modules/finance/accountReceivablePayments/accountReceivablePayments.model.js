const mongoose = require("mongoose");

const arPaymentSchema = new mongoose.Schema(
    {
        arInvoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AccountsReceivable",
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

module.exports = mongoose.model("ARPayment", arPaymentSchema);
