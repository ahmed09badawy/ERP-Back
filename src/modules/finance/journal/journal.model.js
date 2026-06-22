const mongoose = require("mongoose");

const journalLineSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
            required: true,
        },
        debit: {
            type: Number,
            default: 0,
        },
        credit: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: "",
        },
    },
    { _id: false }
);

const journalSchema = new mongoose.Schema(
    {
        entryDate: {
            type: Date,
            required: true,
        },
        referenceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },
        memo: {
            type: String,
            default: "",
        },
        lines: [journalLineSchema],
        status: {
            type: String,
            enum: ["DRAFT", "POSTED", "REVERSED"],
            default: "POSTED",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("JournalEntry", journalSchema);
