const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        departmentCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        departmentName: {
            type: String,
            required: true,
            trim: true,
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        managerName: {
            type: String,
            trim: true,
            default: "",
        },
        state: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
