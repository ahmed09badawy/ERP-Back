const { z } = require("zod");

const createPenaltySchema = z.object({
    employeeInfo: z.string(),
    penaltyType: z.enum(["Late Arrival", "Absence", "Misconduct", "Violation", "Other"]),
    penaltyAmount: z.number().min(0).optional(),
    date: z.string(),
    decisionMaker: z.string(),
    status: z.enum(["Pending", "Approved", "Rejected"]).optional(),
    reason: z.string(),
    attachment: z.string().optional(),
});

const updatePenaltySchema = createPenaltySchema.partial();

module.exports = {
    createPenaltySchema,
    updatePenaltySchema,
};
