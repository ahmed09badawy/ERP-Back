const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        vehicleCode: {
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

        plateNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        model: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            required: true,
            trim: true,
            enum: ["Sedan", "Car", "Truck", "Van", "Bus", "Motorcycle"],
        },

        fuelType: {
            type: String,
            required: true,
            enum: ["Gasoline", "Petrol", "Diesel", "Electric", "Hybrid"],
        },

        mileage: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        status: {
            type: String,
            required: true,
            enum: ["Active", "Maintenance", "In Maintenance", "Inactive"],
            default: "Active",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
