const mongoose = require("mongoose");

const vehicleExpenseSchema = new mongoose.Schema(
    {
        expenseCode: {
            type: String,
            unique: true,
        },

        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },

        type: {
            type: String,
            required: true,
            enum: ["Insurance", "Registration", "Maintenance", "Fuel", "Other"],
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        date: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        attachment: {
            type: String, 
            default: null,
        },

        status: {
            type: String,
            enum: ["Paid", "Pending", "Canceled"],
            default: "Paid",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports =
    mongoose.models.VehicleExpense ||
    mongoose.model("VehicleExpense", vehicleExpenseSchema);
