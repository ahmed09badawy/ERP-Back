const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        departmentName: {
            type: String,
            required: true,
            trim: true,
        },
        fiscalYear: {
            type: Number,
            required: true,
        },
        allocatedAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        spentAmount: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["OPEN", "CLOSED"],
            default: "OPEN",
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
