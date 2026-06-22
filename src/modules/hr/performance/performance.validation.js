const { z } = require("zod");

const createPerformanceSchema = z.object({
    employeeId: z.string(),
    managerId: z.string().optional(),
    period: z.string(),
    evaluationScore: z.number().min(0).max(100),
    status: z.enum(["DRAFT", "COMPLETED", "APPROVED"]).optional(),
    notes: z.string().optional(),
});

const updatePerformanceSchema = createPerformanceSchema.partial();

module.exports = { createPerformanceSchema, updatePerformanceSchema };
