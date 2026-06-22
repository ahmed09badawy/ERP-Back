const mongoose = require("mongoose");

const endOfServiceSchema = new mongoose.Schema(
    {
        eosId: {
            type: String,
            unique: true,
            trim: true,
        },

        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        empCode: {
            type: String,
            required: true,
            trim: true,
        },

        eosType: {
            type: String,
            enum: ["Resignation", "End Contract", "Termination", "Retirement", "Other"],
            required: true,
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

        createdDate: {
            type: Date,
            default: Date.now,
        },

        startDate: {
            type: Date,
            required: true,
        },

        lastWorkingDay: {
            type: Date,
            required: true,
        },

        yearsOfService: {
            type: Number,
            default: 0,
        },

        collectDevice: {
            type: Boolean,
            default: false,
        },

        collectAccessCards: {
            type: Boolean,
            default: false,
        },

        finalSettlementCalculation: {
            type: Number,
            default: 0,
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },

        attachment: {
            type: String,
            default: "",
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

module.exports = mongoose.model("EndOfService", endOfServiceSchema);
