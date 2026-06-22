const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        supplierCode: {
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
        supplierName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: "",
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
        paymentTerms: {
            type: String,
            trim: true,
            default: "",
        },
        companyName: {
            type: String,
            trim: true,
            default: "",
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
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

supplierSchema.index({ supplierCode: 1 }, { unique: true });
supplierSchema.index({ supplierName: 1 });

module.exports = mongoose.model("Supplier", supplierSchema);
