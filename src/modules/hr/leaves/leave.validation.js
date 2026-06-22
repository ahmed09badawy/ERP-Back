const { z } = require("zod");

const createLeaveSchema = z.object({
    leaveId: z.string().min(2),
    employeeId: z.string().min(1),
    leaveType: z.enum(["ANNUAL", "SICK", "UNPAID", "EMERGENCY", "MATERNITY", "OTHER"]),
    fromDate: z.string(),
    toDate: z.string(),
    remainingBalance: z.number().min(0).optional().default(0),
    reason: z.string().optional().default(""),
    attachment: z.string().optional().default(""),
    workflowStatus: z
        .enum(["PENDING_MANAGER", "PENDING_HR", "APPROVED", "REJECTED"])
        .optional()
        .default("PENDING_MANAGER"),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional().default("PENDING"),
    approverId: z.string().optional().nullable(),
});

const updateLeaveSchema = createLeaveSchema.partial();

module.exports = {
    createLeaveSchema,
    updateLeaveSchema,
};
