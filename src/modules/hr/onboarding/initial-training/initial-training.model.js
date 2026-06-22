const mongoose = require("mongoose");

const initialTrainingSchema = new mongoose.Schema(
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

        trainingType: {
            type: String,
            required: true,
            trim: true,
        },

        trainer: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

        doneBy: {
            type: String,
            required: true,
            trim: true,
        },

        doneAt: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["Pending", "Paid", "Unpaid", "Done", "Canceled"],
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

module.exports = mongoose.model("InitialTraining", initialTrainingSchema);
