const mongoose = require("mongoose");

const salesReturnItemSchema = new mongoose.Schema(
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
        invoicedQuantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
        returnQuantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        reasonForReturn: {
            type: String,
            trim: true,
            required: true,
        },
        totalReturnAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
);

const salesReturnSchema = new mongoose.Schema(
    {
        returnNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        originalInvoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SalesInvoice",
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
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
        returnDate: {
            type: Date,
            default: Date.now,
        },
        items: {
            type: [salesReturnItemSchema],
            default: [],
        },
        refundStatus: {
            type: String,
            enum: ["PENDING", "REFUNDED", "PARTIAL_REFUND", "REJECTED"],
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

salesReturnSchema.index({ returnNumber: 1 }, { unique: true });

module.exports = mongoose.model("SalesReturn", salesReturnSchema);
