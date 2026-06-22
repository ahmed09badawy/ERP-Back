const mongoose = require("mongoose");

const coaSchema = new mongoose.Schema(
    {
        accountCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },
        accountName: {
            type: String,
            required: true,
            trim: true,
        },
        accountType: {
            type: String,
            enum: ["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"],
            required: true,
        },
        accountCategory: {
            type: String,
            enum: [
                "CASH",
                "BANK",
                "RECEIVABLE",
                "PAYABLE",
                "INVENTORY",
                "SALES",
                "COGS",
                "EXPENSE",
                "EQUITY",
                "OTHER",
            ],
            default: "OTHER",
        },
        paymentMethod: {
            type: String,
            enum: ["CASH", "BANK", "NONE"],
            default: "NONE",
        },
        parentAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
            default: null,
        },
        level: {
            type: Number,
            default: 1,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports =
    mongoose.models.ChartOfAccount ||
    mongoose.model("ChartOfAccount", coaSchema);
