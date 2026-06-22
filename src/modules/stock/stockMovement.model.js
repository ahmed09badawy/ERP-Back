const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
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
        movementType: {
            type: String,
            enum: ["IN", "OUT", "TRANSFER", "ADJUSTMENT", "RESERVE", "RELEASE"],
            required: true,
        },
        qty: {
            type: Number,
            required: true,
            min: 0,
        },
        referenceType: {
            type: String,
            trim: true,
            default: "",
        },
        referenceId: {
            type: String,
            trim: true,
            default: "",
        },
        movementDate: {
            type: Date,
            default: Date.now,
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

stockMovementSchema.index({ productId: 1, warehouseId: 1, movementDate: -1 });

module.exports = mongoose.model("StockMovement", stockMovementSchema);
