const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema(
    {
        taxName: {
            type: String,
            required: true,
            trim: true,
        },
        taxCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        taxType: {
            type: String,
            enum: ["VAT", "WITHHOLDING", "SALES_TAX"],
            default: "VAT",
        },
        rate: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tax", taxSchema);
