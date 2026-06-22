const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema(
    {
        allocationCode: {
            type: String,
            unique: true,
        },
        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },
        assignedTo: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        usagePurpose: {
            type: String,
            required: true,
            trim: true,
            enum: ["Work", "Production", "Maintenance", "Management"],
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Allocation = mongoose.model("Allocation", allocationSchema);

module.exports = Allocation;
