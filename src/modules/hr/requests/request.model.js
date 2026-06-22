const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        requestNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            unique: true,
        },

        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        requestType: {
            type: String,
            enum: [
                "LEAVE",
                "LOAN",
                "SALARY_CERTIFICATE",
                "EQUIPMENT",
                "PROFILE_UPDATE",
                "OTHER",
            ],
            required: true,
        },

        requestDate: {
            type: Date,
            default: Date.now,
        },

        dueDate: {
            type: Date,
            default: null,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            default: null,
        },

        approvalDate: {
            type: Date,
            default: null,
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
            default: "MEDIUM",
        },

        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED", "IN_PROGRESS", "COMPLETED"],
            default: "PENDING",
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("EmployeeRequest", requestSchema);
