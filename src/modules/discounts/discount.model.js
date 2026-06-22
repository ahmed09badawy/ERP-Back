const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
    {
        discountCode: {
            type: String,
            unique: true,
            trim: true,
            uppercase: true,
        },
        discountName: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["PERCENTAGE", "FIXED"],
            required: true,
        },
        appliesTo: {
            type: String,
            enum: ["PRODUCT", "CUSTOMER", "ORDER_TOTAL"],
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
        value: {
            type: Number,
            required: true,
            min: 0,
        },
        minOrderTotal: {
            type: Number,
            default: 0,
            min: 0,
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
            enum: ["ACTIVE", "INACTIVE", "EXPIRED"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);
