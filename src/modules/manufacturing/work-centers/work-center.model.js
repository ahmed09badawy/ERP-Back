const mongoose = require("mongoose");

const workCenterSchema = new mongoose.Schema(
    {
        work_center_id: {
            type: String,
            unique: true,
        },

        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        machine_type: {
            type: String,
            required: true,
            trim: true,
        },

        capacity_per_hour: {
            type: Number,
            required: true,
            min: 1,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("WorkCenter", workCenterSchema);
