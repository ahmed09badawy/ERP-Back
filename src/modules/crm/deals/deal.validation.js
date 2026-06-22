const { z } = require("zod");

const createDealSchema = z.object({
    dealName: z.string(),
    customer: z.string(),
    dealValue: z.number(),
    stage: z.enum(["Negotiation", "Proposal", "Won", "Lost"]).optional(),
    closingDate: z.string(),
    salesOwner: z.string(),
});

const updateDealSchema = createDealSchema.partial();

module.exports = {
    createDealSchema,
    updateDealSchema,
};
