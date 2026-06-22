const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        customerCode: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        customerName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: "",
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },
        address: {
            type: String,
            trim: true,
            default: "",
        },
        companyName: {
            type: String,
            trim: true,
            default: "",
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            default: null,
        },
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

inventorySchema.index({ customerCode: 1 }, { unique: true });
inventorySchema.index({ customerName: 1 });

module.exports = mongoose.model("Inventory", inventorySchema);
