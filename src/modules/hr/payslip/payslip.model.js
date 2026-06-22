const mongoose = require("mongoose");

const payslipSchema = new mongoose.Schema(
    {
        payslipCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        employeeCode: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: String,
            required: true,
            trim: true,
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },

        salaryMonth: {
            type: String,
            required: true,
            trim: true,
        },

        paymentStatus: {
            type: String,
            enum: ["PAID", "UNPAID", "PENDING"],
            default: "PENDING",
        },

        basicSalary: {
            type: Number,
            default: 0,
        },

        housingAllowance: {
            type: Number,
            default: 0,
        },

        transportAllowance: {
            type: Number,
            default: 0,
        },

        natureAllowance: {
            type: Number,
            default: 0,
        },

        commissions: {
            type: Number,
            default: 0,
        },

        bonuses: {
            type: Number,
            default: 0,
        },

        overtimeHours: {
            type: Number,
            default: 0,
        },

        gosiEmployee: {
            type: Number,
            default: 0,
        },

        hrdfSupport: {
            type: Number,
            default: 0,
        },

        bonus: {
            type: Number,
            default: 0,
        },

        loan: {
            type: Number,
            default: 0,
        },

        sanedDeduction: {
            type: Number,
            default: 0,
        },

        penalties: {
            type: Number,
            default: 0,
        },

        absence: {
            type: Number,
            default: 0,
        },

        earlyLeave: {
            type: Number,
            default: 0,
        },

        totalDeductions: {
            type: Number,
            default: 0,
        },

        netSalary: {
            type: Number,
            default: 0,
        },

        hrSignature: {
            type: String,
            default: "",
        },

        employeeSignature: {
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

module.exports = mongoose.model("Payslip", payslipSchema);
