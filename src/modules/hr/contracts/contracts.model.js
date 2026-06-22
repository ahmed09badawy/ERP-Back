const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
    {
        contractId: {
            type: String,
            unique: true,
        },

        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        contractType: {
            type: String,
            required: true,
        },

        duration: {
            type: String,
        },

        jobTitle: {
            type: String,
            required: true,
        },

        branch: {
            type: String,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
        },

        workingHours: {
            type: String,
        },

        allowances: {
            type: String,
        },

        basicSalary: {
            type: Number,
            required: true,
        },

        state: {
            type: String,
            enum: ["Active", "Expired", "Under Renewal"],
            default: "Active",
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

module.exports = mongoose.model("Contract", contractSchema);
