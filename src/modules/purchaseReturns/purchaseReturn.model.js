const mongoose = require("mongoose");

const purchaseReturnItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        sku: {
            type: String,
            trim: true,
            uppercase: true,
            default: "",
        },
        receivedQuantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
        returnQuantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
        reasonForReturn: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { _id: false }
);

const purchaseReturnSchema = new mongoose.Schema(
    {
        returnNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        returnDate: {
            type: Date,
            default: Date.now,
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
        goodsReceiptId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GoodsReceipt",
            required: true,
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true,
        },
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null,
        },
        items: {
            type: [purchaseReturnItemSchema],
            default: [],
        },
        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

purchaseReturnSchema.index({ returnNumber: 1 }, { unique: true });

module.exports = mongoose.model("PurchaseReturn", purchaseReturnSchema);
