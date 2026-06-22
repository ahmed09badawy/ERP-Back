const { z } = require("zod");

const createAttendanceSchema = z.object({
    employeeId: z.string().min(1),
    date: z.string(),
    checkInTime: z.string().optional(),
    checkOutTime: z.string().optional(),
    shiftType: z.enum(["MORNING", "EVENING", "NIGHT"]).optional().default("MORNING"),
    breakDuration: z.number().min(0).optional().default(0),
    overtimeHours: z.number().min(0).optional().default(0),
    lateMinutes: z.number().min(0).optional().default(0),
    earlyLeaveMinutes: z.number().min(0).optional().default(0),
    status: z.enum(["PRESENT", "ABSENT", "LEAVE", "PERMISSION", "LATE"]).optional().default("PRESENT"),
    notes: z.string().optional().default(""),
});

const updateAttendanceSchema = createAttendanceSchema.partial();

module.exports = {
    createAttendanceSchema,
    updateAttendanceSchema,
};
