const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
    {
        incomeId: {
            type: String,
            unique: true,
            trim: true,
            uppercase: true,
        },

        date: {
            type: Date,
            required: true,
        },

        note: {
            type: String,
            trim: true,
            default: "",
        },

        source: {
            type: String,
            trim: true,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "Bank Transfer", "Online"],
            required: true,
            default: "Cash",
        },

        companyName: {
            type: String,
            trim: true,
            required: true,
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

module.exports = mongoose.model("Income", incomeSchema);
