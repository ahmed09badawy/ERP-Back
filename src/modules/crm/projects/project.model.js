const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        projectCode: {
            type: String,
            unique: true,
        },

        projectName: {
            type: String,
            required: true,
            trim: true,
        },

        teamLeader: {
            type: String,
            required: true,
            trim: true,
        },

        client: {
            type: String,
            required: true,
            trim: true,
        },

        progress: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        startDate: {
            type: Date,
            required: true,
        },

        deadline: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["Completed", "In Progress", "Cancelled"],
            default: "In Progress",
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

module.exports = mongoose.model("Project", projectSchema);
