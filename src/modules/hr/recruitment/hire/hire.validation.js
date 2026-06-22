const { z } = require("zod");

const createHireSchema = z.object({
    candidateId: z.string(),
    offerId: z.string(),
    joiningDate: z.string(),
    onboardingStatus: z
        .enum(["PENDING", "IN_PROGRESS", "COMPLETED"])
        .optional(),
    employeeCreated: z.boolean().optional(),
    notes: z.string().optional(),
});

const updateHireSchema = createHireSchema.partial();

module.exports = { createHireSchema, updateHireSchema };
