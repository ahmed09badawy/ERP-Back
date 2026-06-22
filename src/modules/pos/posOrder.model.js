const mongoose = require("mongoose");

const posOrderItemSchema = new mongoose.Schema(
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
        productName: {
            type: String,
            trim: true,
            default: "",
        },
        barcode: {
            type: String,
            trim: true,
            default: "",
        },
        qty: {
            type: Number,
            required: true,
            min: 0.01,
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        lineTotal: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: true }
);

const posPaymentSchema = new mongoose.Schema(
    {
        method: {
            type: String,
            enum: ["CASH", "MADA", "CREDIT_CARD", "APPLE_PAY"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        amountReceived: {
            type: Number,
            default: 0,
            min: 0,
        },
        change: {
            type: Number,
            default: 0,
            min: 0,
        },
        cardBrand: {
            type: String,
            trim: true,
            default: "",
        },
        last4: {
            type: String,
            trim: true,
            default: "",
        },
        cardHolderName: {
            type: String,
            trim: true,
            default: "",
        },
        device: {
            type: String,
            trim: true,
            default: "",
        },
        authorized: {
            type: Boolean,
            default: false,
        },
        transactionRef: {
            type: String,
            trim: true,
            default: "",
        },
        paidAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const adjustmentSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["AMOUNT", "PERCENT"],
            default: "AMOUNT",
        },
        value: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
);

const posOrderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        status: {
            type: String,
            enum: ["DRAFT", "HELD", "PAID", "CANCELLED"],
            default: "DRAFT",
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            default: null,
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true,
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
        cashierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        items: {
            type: [posOrderItemSchema],
            default: [],
        },
        discount: {
            type: adjustmentSchema,
            default: () => ({ type: "AMOUNT", value: 0 }),
        },
        tax: {
            type: adjustmentSchema,
            default: () => ({ type: "AMOUNT", value: 0 }),
        },
        shippingAmount: {
            type: Number,
            default: 0,
            min: 0,
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
        holdReference: {
            type: String,
            trim: true,
            default: "",
        },
        payments: {
            type: [posPaymentSchema],
            default: [],
        },
        paidAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

posOrderSchema.index({ orderNumber: 1 }, { unique: true });
posOrderSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("PosOrder", posOrderSchema);

