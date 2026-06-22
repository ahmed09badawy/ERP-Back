const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema(
    {
        hireCode: {
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
        offerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offer",
            required: true,
        },
        joiningDate: {
            type: Date,
            required: true,
        },
        onboardingStatus: {
            type: String,
            enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
            default: "PENDING",
        },
        employeeCreated: {
            type: Boolean,
            default: false,
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Hire", hireSchema);
