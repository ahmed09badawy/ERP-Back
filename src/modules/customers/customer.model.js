const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        customerCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        customerName: {
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

customerSchema.index({ customerName: 1 });

module.exports = mongoose.model("Customer", customerSchema);
