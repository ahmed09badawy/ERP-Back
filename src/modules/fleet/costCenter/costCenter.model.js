const mongoose = require("mongoose");

const costCenterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },

        createdBy: {
            type: String,
            default: "Admin", 
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports =
    mongoose.models.CostCenter ||
    mongoose.model("CostCenter", costCenterSchema);
