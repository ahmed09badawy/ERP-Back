const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
    {
        maintenanceCode: {
            type: String,
            unique: true,
            trim: true,
        },

        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },

        type: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
            required: true,
        },

        cost: {
            type: Number,
            required: true,
            min: 0,
        },

        odometer: {
            type: Number,
            required: true,
            min: 0,
        },

        provider: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Scheduled", "Pending", "Completed", "Canceled"],
            default: "Scheduled",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("FleetMaintenance", maintenanceSchema);
