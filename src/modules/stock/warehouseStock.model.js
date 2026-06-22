const mongoose = require("mongoose");

const warehouseStockSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true,
        },
        inStockQty: {
            type: Number,
            default: 0,
            min: 0,
        },
        reservedQty: {
            type: Number,
            default: 0,
            min: 0,
        },
        availableQty: {
            type: Number,
            default: 0,
            min: 0,
        },
        minStockLevel: {
            type: Number,
            default: 0,
            min: 0,
        },
        reorderLevel: {
            type: Number,
            default: 0,
            min: 0,
        },
        stockValue: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);

warehouseStockSchema.index({ productId: 1, warehouseId: 1 }, { unique: true });

module.exports = mongoose.model("WarehouseStock", warehouseStockSchema);
