const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
    {
        promotionCode: {
            type: String,
            unique: true,
            trim: true,
            uppercase: true,
        },
        promotionName: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["PERCENTAGE", "FIXED", "BUY_X_GET_Y", "FREE_SHIPPING"],
            required: true,
        },
        conditionType: {
            type: String,
            enum: ["ORDER_TOTAL", "PRODUCT_QTY", "CUSTOMER", "PROMO_CODE"],
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
        promoCode: {
            type: String,
            trim: true,
            uppercase: true,
            default: "",
        },
        minOrderTotal: {
            type: Number,
            default: 0,
            min: 0,
        },
        minQty: {
            type: Number,
            default: 0,
            min: 0,
        },
        value: {
            type: Number,
            default: 0,
            min: 0,
        },
        benefitDescription: {
            type: String,
            trim: true,
            default: "",
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
            enum: ["ACTIVE", "SCHEDULED", "EXPIRED", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Promotion", promotionSchema);
