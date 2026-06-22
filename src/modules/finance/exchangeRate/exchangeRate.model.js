const mongoose = require("mongoose");

const exchangeRateSchema = new mongoose.Schema({
    fromCurrency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency",
        required: true,
    },
    toCurrency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency",
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("ExchangeRate", exchangeRateSchema);
