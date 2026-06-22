const mongoose = require("mongoose");

const purchaseInvoiceItemSchema = new mongoose.Schema(
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
        total: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
);

const purchaseInvoiceSchema = new mongoose.Schema(
    {
        invoiceNo: {
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
        purchaseOrderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseOrder",
            default: null,
        },
        invoiceDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            default: null,
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            default: null,
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
            type: [purchaseInvoiceItemSchema],
            default: [],
        },
        paymentStatus: {
            type: String,
            enum: ["PAID", "UNPAID", "PARTIAL", "OVERDUE"],
            default: "UNPAID",
        },
        deliveryStatus: {
            type: String,
            enum: ["DELIVERED", "PROCESSING", "CANCELLED"],
            default: "PROCESSING",
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
        discountAmount: {
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

purchaseInvoiceSchema.index({ invoiceNo: 1 }, { unique: true });

module.exports = mongoose.model("PurchaseInvoice", purchaseInvoiceSchema);
