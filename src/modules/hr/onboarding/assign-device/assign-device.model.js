const mongoose = require("mongoose");

const assignDeviceSchema = new mongoose.Schema(
    {
        empCode: {
            type: String,
            required: true,
            trim: true,
        },

        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        deviceType: {
            type: String,
            required: true,
            trim: true,
        },

        serialNumber: {
            type: String,
            required: true,
            trim: true,
        },

        doneAt: {
            type: Date,
        },

        doneBy: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Done", "Canceled"],
            default: "Pending",
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

module.exports = mongoose.model("AssignDevice", assignDeviceSchema);
