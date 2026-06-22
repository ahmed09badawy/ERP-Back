const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema(
    {
        trackingCode: {
            type: String,
            unique: true,
        },
        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },
        currentLocation: {
            type: String,
            required: true,
            trim: true,
        },
        movementHistory: {
            type: String,
            required: true,
            trim: true,
        },
        notes: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Tracking = mongoose.model("Tracking", trackingSchema);

module.exports = Tracking;
