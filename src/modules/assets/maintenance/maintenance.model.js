const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
    {
        maintenanceCode: {
            type: String,
            unique: true,
        },
        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },
        maintenanceType: {
            type: String,
            required: true,
            enum: ["Preventive", "Corrective", "Repair", "Service"],
        },
        scheduledDate: {
            type: Date,
            required: true,
        },
        technician: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
            default: "Scheduled",
        },
        cost: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        attachments: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;
