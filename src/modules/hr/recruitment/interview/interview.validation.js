const { z } = require("zod");

const createInterviewSchema = z.object({
    candidateId: z.string(),
    round: z.number().optional(),
    interviewerName: z.string().min(2),
    interviewDate: z.string(),
    score: z.number().min(0).max(100).optional(),
    result: z.enum(["PASSED", "FAILED", "PENDING"]).optional(),
    feedback: z.string().optional(),
    nextStep: z.string().optional(),
});

const updateInterviewSchema = createInterviewSchema.partial();

module.exports = { createInterviewSchema, updateInterviewSchema };
