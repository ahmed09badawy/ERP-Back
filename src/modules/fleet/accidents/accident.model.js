const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema(
    {
        accidentCode: {
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

        location: {
            type: String,
            required: true,
            trim: true,
        },

        damageLevel: {
            type: String,
            enum: ["Low", "Medium", "High", "Severe"],
            required: true,
        },

        actualCost: {
            type: Number,
            required: true,
            min: 0,
        },

        insuranceProvider: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Open", "Under Review", "Resolved", "Closed"],
            default: "Open",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports =
    mongoose.models.FleetAccident ||
    mongoose.model("FleetAccident", accidentSchema);
