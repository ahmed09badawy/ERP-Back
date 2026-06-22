const mongoose = require("mongoose");

const arSchema = new mongoose.Schema(
    {
        contactId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            required: true,
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
            default: Date.now,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        currencyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Currency",
            required: true,
        },
        exchangeRate: {
            type: Number,
            required: true,
            default: 1,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "inventoryProduct",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                unitPrice: {
                    type: Number,
                    required: true,
                },
                total: {
                    type: Number,
                    required: true,
                },
            },
        ],
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        amountBase: {
            type: Number,
            required: true,
            min: 0,
        },
        paidAmount: {
            type: Number,
            default: 0,
        },
        paymentType: {
            type: String,
            enum: ["CASH", "CREDIT"],
            default: "CREDIT",
        },
        cashAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
        },
        journalEntryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JournalEntry",
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

module.exports = mongoose.model("AccountsReceivable", arSchema);
