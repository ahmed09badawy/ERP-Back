const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        abbreviation: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        parentUnit: {
            type: String,
            required: true,
            trim: true,
        },
        conversionFactor: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

unitSchema.index({ abbreviation: 1 }, { unique: true });
unitSchema.index({ name: 1 });

module.exports = mongoose.model("Unit", unitSchema);
