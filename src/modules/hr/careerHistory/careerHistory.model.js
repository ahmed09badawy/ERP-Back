const mongoose = require("mongoose");

const careerHistorySchema = new mongoose.Schema(
    {
        careerCode: {
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
        previousJobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            default: null,
        },
        newJobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        previousGrade: {
            type: String,
            default: "",
        },
        newGrade: {
            type: String,
            default: "",
        },
        previousSalary: {
            type: Number,
            default: 0,
        },
        newSalary: {
            type: Number,
            default: 0,
        },
        effectiveDate: {
            type: Date,
            required: true,
        },
        changeType: {
            type: String,
            enum: ["PROMOTION", "TRANSFER", "DEMOTION"],
            default: "PROMOTION",
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CareerHistory", careerHistorySchema);
