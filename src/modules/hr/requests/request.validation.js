const { z } = require("zod");

const createRequestSchema = z.object({
    requestNumber: z.string().min(2),
    employeeId: z.string().min(1),
    requestType: z.enum([
        "LEAVE",
        "LOAN",
        "SALARY_CERTIFICATE",
        "EQUIPMENT",
        "PROFILE_UPDATE",
        "OTHER",
    ]),
    dueDate: z.string().optional().nullable(),
    description: z.string().optional().default(""),
    approvedBy: z.string().optional().nullable(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional().default("MEDIUM"),
    status: z
        .enum(["PENDING", "APPROVED", "REJECTED", "IN_PROGRESS", "COMPLETED"])
        .optional()
        .default("PENDING"),
    notes: z.string().optional().default(""),
});

const updateRequestSchema = createRequestSchema.partial();

module.exports = {
    createRequestSchema,
    updateRequestSchema,
};
