const mongoose = require("mongoose");

const deductionSchema = new mongoose.Schema(
    {
        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        absence: {
            type: Number,
            default: 0,
        },

        lateArrival: {
            type: Number,
            default: 0,
        },

        earlyLeave: {
            type: Number,
            default: 0,
        },

        loan: {
            type: Number,
            default: 0,
        },

        penaltiesDeduction: {
            type: Number,
            default: 0,
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

module.exports = mongoose.model("Deduction", deductionSchema);
