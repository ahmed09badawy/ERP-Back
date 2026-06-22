const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        sku: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
            default: "",
        },
        productName: {
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        defaultUnit: {
            type: String,
            required: true,
            trim: true,
        },
        isStockItem: {
            type: String,
            enum: ["YES", "NO"],
            default: "YES",
        },
        companyName: {
            type: String,
            required: true,
            trim: true,
        },
        openingStock: {
            type: Number,
            required: true,
            min: 0,
        },
        reorderLevel: {
            type: Number,
            required: true,
            min: 0,
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true,
        },
        currentStockQty: {
            type: Number,
            required: true,
            min: 0,
        },
        expired: {
            type: String,
            enum: ["NO", "NEAR_EXPIRY", "EXPIRED"],
            default: "NO",
        },
        purchasePrice: {
            type: Number,
            required: true,
            min: 0,
        },
        sellingPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

productSchema.index({ productName: 1 });
productSchema.index({ barcode: 1 }, { unique: true });

module.exports = mongoose.model("inventoryProduct", productSchema);
