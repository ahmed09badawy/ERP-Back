const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        tripCode: {
            type: String,
            unique: true,
        },

        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },

        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: true,
        },

        startLocation: {
            type: String,
            required: true,
            trim: true,
        },

        endLocation: {
            type: String,
            required: true,
            trim: true,
        },

        startTime: {
            type: Date,
            required: true,
        },

        endTime: {
            type: Date,
            default: null,
        },

        fuelUsed: {
            type: Number,
            default: 0,
            min: 0,
        },

        distance: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: ["Ongoing", "Completed", "Canceled"],
            default: "Ongoing",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Trip", tripSchema);
