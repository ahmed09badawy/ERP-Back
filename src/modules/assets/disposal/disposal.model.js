const mongoose = require("mongoose");

const disposalSchema = new mongoose.Schema(
    {
        disposalCode: {
            type: String,
            unique: true,
        },

        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },

        assetName: {
            type: String,
            required: true,
            trim: true,
        },

        model: {
            type: String,
            required: true,
            trim: true,
        },

        serialNumber: {
            type: String,
            required: true,
            trim: true,
        },

        brand: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        currentValue: {
            type: Number,
            required: true,
            min: 0,
        },

        purchaseCost: {
            type: Number,
            required: true,
            min: 0,
        },

        purchaseDate: {
            type: Date,
            required: true,
        },

        disposalType: {
            type: String,
            required: true,
            enum: ["Sale", "Scrap", "Donation", "Retirement", "Transfer"],
        },

        disposalValue: {
            type: Number,
            required: true,
            min: 0,
        },

        invoiceNumber: {
            type: String,
            required: true,
            trim: true,
        },

        paymentMethod: {
            type: String,
            required: true,
            enum: ["Cash", "Bank Transfer", "Cheque", "Card"],
        },

        notes: {
            type: String,
            required: true,
            trim: true,
        },

        attachments: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Disposal = mongoose.model("Disposal", disposalSchema);

module.exports = Disposal;
