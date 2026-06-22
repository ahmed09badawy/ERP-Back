const mongoose = require("mongoose");

const billOfMaterialsSchema = new mongoose.Schema(
    {
        bom_id: {
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
        },

        component_item: {
            type: String,
            required: true,
            trim: true,
        },

        qty: {
            type: Number,
            required: true,
            min: 1,
        },

        uom: {
            type: String,
            required: true,
            enum: ["kg", "pcs", "liters"],
        },

        version: {
            type: String,
            required: true,
        },

        notes: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("BillOfMaterials", billOfMaterialsSchema);
