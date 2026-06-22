const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
    {
        assetCode: {
            type: String,
            unique: true,
        },
        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
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
            unique: true,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        warrantyPeriod: {
            type: Number,
            required: true,
        },
        warrantyEndDate: {
            type: Date,
            required: true,
        },
        warrantyNumber: {
            type: String,
            required: true,
            trim: true,
        },
        barcode: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Furniture", "IT Equipment", "Vehicle", "Machinery"],
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        cost: {
            type: Number,
            required: true,
            min: 0,
        },
        purchaseDate: {
            type: Date,
            required: true,
        },
        assignedTo: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            enum: ["Present", "Active", "In Maintenance", "Retired", "Lost", "Scrap"],
            default: "Present",
        },
        notes: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default: "",
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

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
