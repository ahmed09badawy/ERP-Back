const { z } = require("zod");

const createGroupSchema = z.object({
    name: z.string().min(2),
    nameEn: z.string().optional(),
    description: z.string().optional(),
    discountPercentage: z.number().min(0).max(100).optional().default(0),
    isActive: z.boolean().optional().default(true),
});

const updateGroupSchema = createGroupSchema.partial();

module.exports = {
    createGroupSchema,
    updateGroupSchema,
};
