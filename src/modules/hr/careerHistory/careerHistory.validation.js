const { z } = require("zod");

const createCareerHistorySchema = z.object({
    employeeId: z.string(),
    previousJobId: z.string().optional().nullable(),
    newJobId: z.string(),
    previousGrade: z.string().optional(),
    newGrade: z.string().optional(),
    previousSalary: z.number().optional(),
    newSalary: z.number().optional(),
    effectiveDate: z.string(),
    changeType: z
        .enum(["PROMOTION", "TRANSFER", "DEMOTION"])
        .optional(),
    notes: z.string().optional(),
});

const updateCareerHistorySchema = createCareerHistorySchema.partial();

module.exports = { createCareerHistorySchema, updateCareerHistorySchema };
