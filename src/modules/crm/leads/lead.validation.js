const { z } = require("zod");

const createLeadSchema = z.object({
    leadName: z.string(),
    phone: z.string(),
    company: z.string(),
    leadOwner: z.string(),
    leadStatus: z.enum(["Connected", "Not Contacted", "Lost"]).optional(),
});

const updateLeadSchema = createLeadSchema.partial();

module.exports = {
    createLeadSchema,
    updateLeadSchema,
};
