const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
    {
        leaveId: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },

        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        leaveType: {
            type: String,
            enum: ["ANNUAL", "SICK", "UNPAID", "EMERGENCY", "MATERNITY", "OTHER"],
            required: true,
        },

        fromDate: {
            type: Date,
            required: true,
        },

        toDate: {
            type: Date,
            required: true,
        },

        days: {
            type: Number,
            default: 0,
            min: 0,
        },

        remainingBalance: {
            type: Number,
            default: 0,
            min: 0,
        },

        reason: {
            type: String,
            trim: true,
            default: "",
        },

        attachment: {
            type: String,
            trim: true,
            default: "",
        },

        workflowStatus: {
            type: String,
            enum: ["PENDING_MANAGER", "PENDING_HR", "APPROVED", "REJECTED"],
            default: "PENDING_MANAGER",
        },

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
        },

        approverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            default: null,
        },
    },
    { timestamps: true }
);

leaveSchema.index({ leaveId: 1 }, { unique: true });

module.exports = mongoose.model("Leave", leaveSchema);
