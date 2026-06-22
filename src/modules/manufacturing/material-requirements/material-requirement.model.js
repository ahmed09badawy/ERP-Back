const mongoose = require("mongoose");

const materialRequirementSchema = new mongoose.Schema(
    {
        material: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        bom_qty_per_unit: {
            type: Number,
            required: true,
            min: 0,
        },

        required_qty: {
            type: Number,
            required: true,
            min: 0,
        },

        available_qty: {
            type: Number,
            required: true,
            min: 0,
        },

        unit: {
            type: String,
            required: true,
            enum: ["kg", "pcs", "sheets", "meters", "liters"],
        },

        source: {
            type: String,
            required: true,
            enum: ["Warehouse 1", "Warehouse 2", "Supplier", "External"],
        },

        notes: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("MaterialRequirement", materialRequirementSchema);
