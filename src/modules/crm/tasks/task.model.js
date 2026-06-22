const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        taskCode: {
            type: String,
            unique: true,
        },

        taskTitle: {
            type: String,
            required: true,
            trim: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        assignee: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            enum: ["Completed", "In Progress", "Cancelled"],
            default: "In Progress",
        },

        description: {
            type: String,
            trim: true,
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

module.exports = mongoose.model("Task", taskSchema);
