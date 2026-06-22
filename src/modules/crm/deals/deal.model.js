const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
    {
        dealCode: {
            type: String,
            unique: true,
        },

        dealName: {
            type: String,
            required: true,
            trim: true,
        },

        customer: {
            type: String,
            required: true,
            trim: true,
        },

        dealValue: {
            type: Number,
            required: true,
        },

        stage: {
            type: String,
            enum: ["Negotiation", "Proposal", "Won", "Lost"],
            default: "Negotiation",
        },

        closingDate: {
            type: Date,
            required: true,
        },

        salesOwner: {
            type: String,
            required: true,
            trim: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Deal", dealSchema);
