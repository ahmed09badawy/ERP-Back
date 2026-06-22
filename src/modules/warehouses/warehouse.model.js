const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        warehouseName: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: [
                "MAIN_WAREHOUSE",
                "SUB_WAREHOUSE",
                "STORE",
                "DISTRIBUTION_CENTER",
                "COLD_STORAGE",
                "RAW_MATERIALS",
                "FINISHED_GOODS",
            ],
            default: "MAIN_WAREHOUSE",
        },
        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            default: null,
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            default: null,
        },
        managerName: {
            type: String,
            trim: true,
            default: "",
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: "",
        },
        location: {
            type: String,
            trim: true,
            default: "",
        },
        state: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "UNDER_MAINTENANCE", "CLOSED"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

warehouseSchema.index({ code: 1 }, { unique: true });
warehouseSchema.index({ warehouseName: 1 });

module.exports = mongoose.model("Warehouse", warehouseSchema);
