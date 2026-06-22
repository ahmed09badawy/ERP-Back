const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        expenseId: {
            type: String,
            unique: true,
            trim: true,
            uppercase: true,
        },

        date: {
            type: Date,
            required: true,
        },

        category: {
            type: String,
            trim: true,
            required: true,
        },

        payee: {
            type: String,
            trim: true,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "Bank Transfer", "Online"],
            default: "Cash",
        },

        note: {
            type: String,
            trim: true,
            default: "",
        },

        vatPercent: {
            type: Number,
            default: 0,
        },

        vatAmount: {
            type: Number,
            default: 0,
        },

        amount: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            trim: true,
            uppercase: true,
            default: "USD",
        },

        status: {
            type: String,
            enum: ["Paid", "Unpaid", "partial"],
            default: "Unpaid",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Expense", expenseSchema);
