const mongoose = require("mongoose");

const purchaseOrderItemSchema = new mongoose.Schema(
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
        quantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
        unitCost: {
            type: Number,
            required: true,
            min: 0,
        },
        tax: {
            type: Number,
            default: 0,
            min: 0,
        },
        receivedQuantity: {
            type: Number,
            default: 0,
            min: 0,
        },
        pendingQuantity: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
);

const purchaseOrderSchema = new mongoose.Schema(
    {
        referenceNo: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
        linkedPurchaseRequestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseRequest",
            default: null,
        },
        orderDate: {
            type: Date,
            default: Date.now,
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
        items: {
            type: [purchaseOrderItemSchema],
            default: [],
        },
        paymentStatus: {
            type: String,
            enum: ["PAID", "UNPAID", "PARTIAL"],
            default: "UNPAID",
        },
        deliveryStatus: {
            type: String,
            enum: ["PENDING", "PROCESSING", "PARTIALLY_DELIVERED", "DELIVERED", "CANCELLED"],
            default: "PENDING",
        },
        subtotal: {
            type: Number,
            default: 0,
            min: 0,
        },
        taxAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        totalAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

purchaseOrderSchema.index({ referenceNo: 1 }, { unique: true });

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);
