const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        state: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

roleSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Role", roleSchema);
