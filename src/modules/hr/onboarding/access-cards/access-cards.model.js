const mongoose = require("mongoose");

const accessCardSchema = new mongoose.Schema(
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

        cardNumber: {
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

module.exports = mongoose.model("AccessCard", accessCardSchema);
