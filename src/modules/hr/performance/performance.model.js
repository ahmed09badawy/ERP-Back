const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
    {
        performanceCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
        },
        period: {
            type: String,
            required: true,
        },
        evaluationScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        status: {
            type: String,
            enum: ["DRAFT", "COMPLETED", "APPROVED"],
            default: "COMPLETED",
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Performance", performanceSchema);
