const mongoose = require("mongoose");

const quotationItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        productName: {
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

const quotationSchema = new mongoose.Schema(
    {
        quotationNo: {
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
        quotationDate: {
            type: Date,
            default: Date.now,
        },
        expirationDate: {
            type: Date,
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
        items: {
            type: [quotationItemSchema],
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
        notes: {
            type: String,
            trim: true,
            default: "",
        },
        termsAndConditions: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["DRAFT", "SENT", "EXPIRED"],
            default: "DRAFT",
        },
    },
    { timestamps: true }
);

quotationSchema.index({ quotationNo: 1 }, { unique: true });

module.exports = mongoose.model("Quotation", quotationSchema);
