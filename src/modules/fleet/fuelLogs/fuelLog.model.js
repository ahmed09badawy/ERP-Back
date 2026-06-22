const mongoose = require("mongoose");

const fuelLogSchema = new mongoose.Schema(
    {
        fuelCode: {
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

        date: {
            type: Date,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
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

        station: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("FuelLog", fuelLogSchema);
