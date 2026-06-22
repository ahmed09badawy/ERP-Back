const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {
        interviewCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
            required: true,
        },
        round: {
            type: Number,
            required: true,
            default: 1,
        },
        interviewerName: {
            type: String,
            required: true,
            trim: true,
        },
        interviewDate: {
            type: Date,
            required: true,
        },
        score: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        result: {
            type: String,
            enum: ["PASSED", "FAILED", "PENDING"],
            default: "PENDING",
        },
        feedback: {
            type: String,
            default: "",
        },
        nextStep: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
