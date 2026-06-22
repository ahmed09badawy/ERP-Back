const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
    {
        driverCode: {
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

        driverName: {
            type: String,
            required: true,
            trim: true,
        },

        licenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        licenseExpiry: {
            type: Date,
            required: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        assignedVehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            default: null,
        },

        status: {
            type: String,
            enum: ["Active", "Inactive", "On Trip"],
            default: "Active",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Driver", driverSchema);
