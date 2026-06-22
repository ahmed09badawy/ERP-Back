const mongoose = require("mongoose");

const penaltySchema = new mongoose.Schema(
    {
        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        penaltyId: {
            type: String,
            unique: true,
            trim: true,
        },

        penaltyType: {
            type: String,
            enum: ["Late Arrival", "Absence", "Misconduct", "Violation", "Other"],
            required: true,
        },

        penaltyAmount: {
            type: Number,
            default: 0,
        },

        date: {
            type: Date,
            required: true,
        },

        decisionMaker: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
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

module.exports = mongoose.model("Penalty", penaltySchema);
