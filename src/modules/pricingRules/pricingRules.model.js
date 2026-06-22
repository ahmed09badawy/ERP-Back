const mongoose = require("mongoose");

const pricingRuleSchema = new mongoose.Schema(
    {
        ruleName: {
            type: String,
            required: true,
            trim: true,
        },
        appliesTo: {
            type: String,
            enum: ["PRODUCT", "CUSTOMER", "CATEGORY"],
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: null,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            default: null,
        },
        minQty: {
            type: Number,
            default: 1,
        },
        priceType: {
            type: String,
            enum: ["FIXED", "PERCENTAGE"],
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            default: null,
        },
        endDate: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("PricingRule", pricingRuleSchema);
