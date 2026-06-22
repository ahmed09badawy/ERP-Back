const mongoose = require("mongoose");

const monthlyClosingSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    isClosed: {
        type: Boolean,
        default: true,
    },
    closedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// unique month + year
monthlyClosingSchema.index({ month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("MonthlyClosing", monthlyClosingSchema);
