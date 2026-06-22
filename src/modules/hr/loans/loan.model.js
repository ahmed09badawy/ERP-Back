const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
    {
        loanId: {
            type: String,
            unique: true,
        },

        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        loanAmount: {
            type: Number,
            required: true,
        },

        remainingAmount: {
            type: Number,
            default: 0,
        },

        deductionType: {
            type: String,
            enum: ["SINGLE", "INSTALLMENTS"],
            default: "SINGLE",
        },

        installmentAmount: {
            type: Number,
            default: 0,
        },

        startMonth: {
            type: String,
        },

        reason: {
            type: String,
            trim: true,
        },

        approvalBy: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },

        rejectedReason: {
            type: String,
            default: "",
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

module.exports = mongoose.model("Loan", loanSchema);
