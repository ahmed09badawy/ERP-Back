const mongoose = require("mongoose");

const wipSchema = new mongoose.Schema(
    {
        mo_number: {
            type: String,
            unique: true,
        },

        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        product: {
            type: String,
            required: true,
            trim: true,
        },

        planned_qty: {
            type: Number,
            required: true,
            min: 1,
        },

        produced_qty: {
            type: Number,
            required: true,
            min: 0,
        },

        scrap_qty: {
            type: Number,
            required: true,
            min: 0,
        },

        start_date: {
            type: Date,
            required: true,
        },

        expected_end_date: {
            type: Date,
            required: true,
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

module.exports = mongoose.model("WorkInProgress", wipSchema);
