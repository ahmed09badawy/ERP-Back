const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        companyCode: {
            type: String,
            unique: true,
            trim: true,
            uppercase: true,
        },
        name: { type: String, required: true, trim: true },
        taxNumber: { type: String, trim: true, default: "" },
        email: { type: String, trim: true, lowercase: true, default: "" },
        defaultCurrency: { type: String, trim: true, uppercase: true, default: "EGP" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);  
