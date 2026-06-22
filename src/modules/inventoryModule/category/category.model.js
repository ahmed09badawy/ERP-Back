const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        incomeAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
            required: true,
        },
        expenseAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
            required: true,
        },
        inventoryValuationAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
            required: true,
        },
        costOfGoodsSoldAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
            required: true,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

categorySchema.index({ name: 1 });

module.exports = mongoose.model("Category", categorySchema);
