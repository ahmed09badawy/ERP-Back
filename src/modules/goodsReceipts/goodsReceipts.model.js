const mongoose = require("mongoose");

const goodsReceiptItemSchema = new mongoose.Schema(
    {
        grnNumber: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
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
        orderedQuantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
        receivedQuantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        total: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
    
);
const goodsReceiptSchema = new mongoose.Schema(
    {
        grnNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        purchaseOrderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseOrder",
            required: true,
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
        receiptDate: {
            type: Date,
            default: Date.now,
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
        receivedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        items: {
            type: [goodsReceiptItemSchema],
            default: [],
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

goodsReceiptSchema.index({ grnNumber: 1 }, { unique: true });

module.exports = mongoose.model("GoodsReceipt", goodsReceiptSchema);
