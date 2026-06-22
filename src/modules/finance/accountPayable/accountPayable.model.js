const mongoose = require("mongoose");

const apSchema = new mongoose.Schema(
    {
        vendorName: {
            type: String,
            required: true,
            trim: true,
        },
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        invoiceDate: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        paidAmount: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["PENDING", "PARTIAL", "PAID", "OVERDUE"],
            default: "PENDING",
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AccountsPayable", apSchema);
