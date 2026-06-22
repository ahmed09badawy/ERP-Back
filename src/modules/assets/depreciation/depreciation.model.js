const mongoose = require("mongoose");

const depreciationSchema = new mongoose.Schema(
    {
        depreciationCode: {
            type: String,
            unique: true,
        },
        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },

        purchaseCost: {
            type: Number,
            required: true,
            min: 0,
        },

        usefulLife: {
            type: String,
            required: true, 
        },

        depreciationMethod: {
            type: String,
            required: true,
            enum: ["Straight Line", "Declining Balance", "Units of Production"],
        },

        accumulatedDepreciation: {
            type: Number,
            required: true,
            min: 0,
        },

        currentValue: {
            type: Number,
            required: true,
            min: 0,
        },

        accountingPeriod: {
            type: String,
            required: true,
            enum: ["Month", "Quarter", "Year"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Depreciation = mongoose.model("Depreciation", depreciationSchema);

module.exports = Depreciation;
