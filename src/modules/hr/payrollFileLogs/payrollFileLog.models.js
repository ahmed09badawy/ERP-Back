const mongoose = require("mongoose");

const payrollFileLogSchema = new mongoose.Schema(
    {
        payrollRunId: {
            type: String,
            required: true,
            unique: true
        },

        month: {
            type: String,
            required: true
        },

        runDate: {
            type: Date,
            default: Date.now
        },

        runBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        numberOfEmployees: {
            type: Number,
            required: true,
            default: 0
        },

        totalPayroll: {
            type: Number,
            required: true,
            default: 0
        },

        status: {
            type: String,
            enum: ["SUCCESS", "FAILED", "PROCESSING"],
            default: "SUCCESS"
        },

        notes: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("PayrollFileLog", payrollFileLogSchema);
