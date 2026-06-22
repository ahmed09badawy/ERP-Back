const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // USD
    },
    name: {
        type: String,
        required: true, // US Dollar
    },
    symbol: {
        type: String,
        default: "$",
    },
    isBaseCurrency: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Currency", currencySchema);
