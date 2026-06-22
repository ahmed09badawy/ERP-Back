const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        operation_id: {
            type: String,
            unique: true,
        },

        operation_name: {
            type: String,
            required: true,
            trim: true,
        },

        work_center: {
            type: String,
            required: true,
            trim: true,
        },

        duration: {
            type: Number,
            required: true,
            min: 1,
        },

        sequence: {
            type: Number,
            required: true,
            min: 1,
        },

        cost: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Operation", operationSchema);
