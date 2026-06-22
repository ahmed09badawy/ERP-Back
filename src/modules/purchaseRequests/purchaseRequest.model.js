const mongoose = require("mongoose");

const purchaseRequestItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: null,
        },
        itemName: {
            type: String,
            required: true,
            trim: true,
        },
        requiredQuantity: {
            type: Number,
            required: true,
            min: 0.01,
        },
        estimatedUnitCost: {
            type: Number,
            default: 0,
            min: 0,
        },
        totalCost: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
);

const purchaseRequestSchema = new mongoose.Schema(
    {
        prNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        requestDate: {
            type: Date,
            default: Date.now,
        },
        department: {
            type: String,
            trim: true,
            default: "",
        },
        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
            type: [purchaseRequestItemSchema],
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

purchaseRequestSchema.index({ prNumber: 1 }, { unique: true });

module.exports = mongoose.model("PurchaseRequest", purchaseRequestSchema);
