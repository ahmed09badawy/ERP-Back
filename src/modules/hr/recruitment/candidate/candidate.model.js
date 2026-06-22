const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            default: "",
        },
        appliedPosition: {
            type: String,
            required: true,
        },
        expectedSalary: {
            type: Number,
            default: 0,
        },
        source: {
            type: String,
            enum: ["LINKEDIN", "REFERRAL", "WEBSITE", "OTHER"],
            default: "OTHER",
        },
        status: {
            type: String,
            enum: [
                "APPLIED",
                "SCREENING",
                "INTERVIEW",
                "OFFERED",
                "HIRED",
                "REJECTED",
            ],
            default: "APPLIED",
        },
        appliedDate: {
            type: Date,
            default: Date.now,
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
