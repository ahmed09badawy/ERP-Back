const mongoose = require("mongoose");

const insurancePolicySchema = new mongoose.Schema(
    {
        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        policyNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        insuranceCompany: {
            type: String,
            required: true,
            trim: true,
        },

        planName: {
            type: String,
            enum: ["Bronze", "Silver", "Gold", "Premium", "Basic", "Other"],
            required: true,
        },

        policyStartDate: {
            type: Date,
            required: true,
        },

        policyEndDate: {
            type: Date,
            required: true,
        },

        totalCost: {
            type: Number,
            required: true,
            min: 0,
        },

        policyPlan: {
            type: String,
            required: true,
            trim: true,
        },

        familyMembers: {
            type: String,
            default: "0 members",
            trim: true,
        },

        coverageExpiryDate: {
            type: Date,
            required: true,
        },

        membershipId: {
            type: String,
            required: true,
            trim: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("InsurancePolicy", insurancePolicySchema);
