const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
    {
        auditCode: {
            type: String,
            unique: true,
        },
        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },
        actionType: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "Create",
                "Update",
                "Delete",
                "Transfer",
                "Maintenance",
                "Disposal",
                "Allocation",
                "Scrap",
                "Retirement",
            ],
        },
        byWho: {
            type: String,
            required: true,
            trim: true,
        },
        changeDescription: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;
