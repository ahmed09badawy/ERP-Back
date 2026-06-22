const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        sku: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            trim: true,
            default: "",
        },
        productType: {
            type: String,
            enum: ["SERVICE", "STOCKABLE", "CONSUMABLE"],
            default: "STOCKABLE",
        },
        salesPrice: {
            type: Number,
            default: 0,
            min: 0,
        },
        cost: {
            type: Number,
            default: 0,
            min: 0,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        unitOfMeasure: {
            type: String,
            trim: true,
            default: "Piece",
        },
        barcode: {
            type: String,
            trim: true,
            default: "",
        },
        companyName: {
            type: String,
            trim: true,
            default: "",
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            default: null,
        },
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null,
        },
        hasExpiry: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ productName: 1 });

module.exports = mongoose.model("Product", productSchema);
