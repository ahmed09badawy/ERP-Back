const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    iban: String,
    currency: {
        type: String,
        default: "SAR",
    },
    balance: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("BankAccount", bankAccountSchema);
