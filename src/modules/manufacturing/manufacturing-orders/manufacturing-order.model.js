const mongoose = require("mongoose");

const manufacturingOrderSchema = new mongoose.Schema(
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

        product_name: {
            type: String,
            required: true,
            trim: true,
        },

        product_code: {
            type: String,
            unique: true,
            trim: true,
        },

        planned_quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        produced_quantity: {
            type: Number,
            required: true,
            min: 0,
        },

        cost_summary: {
            type: Number,
            required: true,
            min: 0,
        },

        bom_used: {
            type: String,
            required: true,
            trim: true,
        },

        work_center: {
            type: String,
            required: true,
            trim: true,
        },

        start_date: {
            type: Date,
            required: true,
        },

        end_date: {
            type: Date,
            required: true,
        },

        responsible: {
            type: String,
            required: true,
            trim: true,
        },

        raw_material_availability: {
            type: String,
            enum: ["Available", "Partially Available", "Not Available"],
            required: true,
        },

        state: {
            type: String,
            enum: ["Draft", "In Progress", "Done", "Cancelled"],
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("ManufacturingOrder", manufacturingOrderSchema);
