const { z } = require("zod");

const createCandidateSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    appliedPosition: z.string().min(2),
    expectedSalary: z.number().optional(),
    source: z
        .enum(["LINKEDIN", "REFERRAL", "WEBSITE", "OTHER"])
        .optional(),
    status: z
        .enum([
            "APPLIED",
            "SCREENING",
            "INTERVIEW",
            "OFFERED",
            "HIRED",
            "REJECTED",
        ])
        .optional(),
    appliedDate: z.string().optional(),
    notes: z.string().optional(),
});

const updateCandidateSchema = createCandidateSchema.partial();

module.exports = { createCandidateSchema, updateCandidateSchema };
