const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
    {
        payrollCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
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

        payrollMonth: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
        },

        payrollYear: {
            type: Number,
            required: true,
            min: 2000,
        },

        basicSalary: {
            type: Number,
            required: true,
            min: 0,
        },

        housingAllowance: {
            type: Number,
            default: 0,
            min: 0,
        },

        transportAllowance: {
            type: Number,
            default: 0,
            min: 0,
        },

        workNatureAllowance: {
            type: Number,
            default: 0,
            min: 0,
        },

        medicalAllowance: {
            type: Number,
            default: 0,
            min: 0,
        },

        commissions: {
            type: Number,
            default: 0,
            min: 0,
        },

        bonus: {
            type: Number,
            default: 0,
            min: 0,
        },

        overtimeHours: {
            type: Number,
            default: 0,
            min: 0,
        },

        overtimeRate: {
            type: Number,
            default: 0,
            min: 0,
        },

        overtimeAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        deductions: {
            absence: { type: Number, default: 0, min: 0 },
            lateArrival: { type: Number, default: 0, min: 0 },
            earlyLeave: { type: Number, default: 0, min: 0 },
            loan: { type: Number, default: 0, min: 0 },
            penalties: { type: Number, default: 0, min: 0 },
            other: { type: Number, default: 0, min: 0 },
        },

        totalAllowances: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalDeductions: {
            type: Number,
            default: 0,
            min: 0,
        },

        grossSalary: {
            type: Number,
            default: 0,
            min: 0,
        },

        netSalary: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: ["DRAFT", "UNDER_REVIEW", "PAID", "UNPAID"],
            default: "DRAFT",
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

payrollSchema.index(
    { employeeId: 1, payrollMonth: 1, payrollYear: 1 },
    { unique: true }
);

module.exports = mongoose.model("Payroll", payrollSchema);
