const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        leadCode: {
            type: String,
            unique: true,
        },

        leadName: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        leadOwner: {
            type: String,
            required: true,
            trim: true,
        },

        leadStatus: {
            type: String,
            enum: ["Connected", "Not Contacted", "Lost"],
            default: "Not Contacted",
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

module.exports = mongoose.model("Lead", leadSchema);
