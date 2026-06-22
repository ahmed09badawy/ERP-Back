const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        offerCode: {
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
        offeredPosition: {
            type: String,
            required: true,
        },
        offeredSalary: {
            type: Number,
            required: true,
        },
        joiningDate: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "REJECTED"],
            default: "PENDING",
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
