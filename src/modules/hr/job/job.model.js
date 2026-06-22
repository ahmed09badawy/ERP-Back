const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        jobCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        jobName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        state: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
