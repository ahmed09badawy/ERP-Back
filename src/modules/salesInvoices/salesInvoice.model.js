const mongoose = require("mongoose");

const salesInvoiceItemSchema = new mongoose.Schema(
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

const salesInvoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        salesOrderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SalesOrder",
            default: null,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
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
        salespersonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        issuedDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            default: null,
        },
        items: {
            type: [salesInvoiceItemSchema],
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
            enum: ["PAID", "UNPAID", "PARTIALLY_PAID"],
            default: "UNPAID",
        },
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

salesInvoiceSchema.index({ invoiceNumber: 1 }, { unique: true });

module.exports = mongoose.model("SalesInvoice", salesInvoiceSchema);
