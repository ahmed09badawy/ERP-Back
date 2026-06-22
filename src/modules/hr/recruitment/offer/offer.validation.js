const { z } = require("zod");

const createOfferSchema = z.object({
    candidateId: z.string(),
    offeredPosition: z.string().min(2),
    offeredSalary: z.number(),
    joiningDate: z.string().optional(),
    status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
    notes: z.string().optional(),
});

const updateOfferSchema = createOfferSchema.partial();

module.exports = { createOfferSchema, updateOfferSchema };
