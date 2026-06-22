const mongoose = require("mongoose");

const salesOrderItemSchema = new mongoose.Schema(
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
        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
            min: 0,
        },
        tax: {
            type: Number,
            default: 0,
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

const salesOrderSchema = new mongoose.Schema(
    {
        orderNo: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
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
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            default: null,
        },
        salespersonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        items: {
            type: [salesOrderItemSchema],
            default: [],
        },
        subtotal: {
            type: Number,
            default: 0,
            min: 0,
        },
        discountAmount: {
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
        paymentStatus: {
            type: String,
            enum: ["PAID", "PENDING", "PARTIALLY_PAID", "UNPAID"],
            default: "UNPAID",
        },
        deliveryStatus: {
            type: String,
            enum: ["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"],
            default: "PENDING",
        },
        status: {
            type: String,
            enum: ["DRAFT", "CONFIRMED", "CANCELLED"],
            default: "CONFIRMED",
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
        promoCode: {
            type: String,
            trim: true,
            uppercase: true,
            default: "",
        },
    },
    { timestamps: true }
);

salesOrderSchema.index({ orderNo: 1 }, { unique: true });

module.exports = mongoose.model("SalesOrder", salesOrderSchema);
