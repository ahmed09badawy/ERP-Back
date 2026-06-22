const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
    {
        branchCode: {
            type: String,
            unique: true,
            trim: true,
            uppercase: true,
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },
        address: {
            type: String,
            trim: true,
            default: "",
        },
        state: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

branchSchema.index({ companyId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Branch", branchSchema);
