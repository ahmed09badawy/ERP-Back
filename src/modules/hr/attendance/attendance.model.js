const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        attendanceCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        checkInTime: {
            type: Date,
            default: null,
        },

        checkOutTime: {
            type: Date,
            default: null,
        },

        shiftType: {
            type: String,
            enum: ["MORNING", "EVENING", "NIGHT"],
            default: "MORNING",
        },

        breakDuration: {
            type: Number,
            default: 0,
            min: 0,
        },

        workingHours: {
            type: Number,
            default: 0,
            min: 0,
        },

        overtimeHours: {
            type: Number,
            default: 0,
            min: 0,
        },

        lateMinutes: {
            type: Number,
            default: 0,
            min: 0,
        },

        earlyLeaveMinutes: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: ["PRESENT", "ABSENT", "LEAVE", "PERMISSION", "LATE"],
            default: "PRESENT",
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
