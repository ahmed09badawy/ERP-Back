const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        bookingCode: {
            type: String,
            unique: true,
        },

        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },

        requestedBy: {
            type: String,
            required: true,
            trim: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        purpose: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Completed"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports =
    mongoose.models.VehicleBooking ||
    mongoose.model("VehicleBooking", bookingSchema);
