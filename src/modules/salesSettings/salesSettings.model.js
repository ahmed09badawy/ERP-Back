const mongoose = require("mongoose");

const salesSettingsSchema = new mongoose.Schema(
    {
        vatPercentage: {
            type: Number,
            default: 0,
        },

        invoiceNumberingMethod: {
            type: String,
            enum: ["MANUAL", "AUTO"],
            default: "MANUAL",
        },

        defaultPricelist: {
            type: String,
            default: "",
        },

        defaultPaymentTerms: {
            type: String,
            default: "",
        },

        defaultCurrency: {
            type: String,
            default: "EGP",
        },

        allowReturnsWithoutInvoice: {
            type: Boolean,
            default: false,
        },

        allowSellingOutOfStock: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SalesSettings", salesSettingsSchema);
