const { z } = require("zod");

const createPricelistSchema = z.object({
    name: z.string().min(2),
    nameEn: z.string().optional(),
    currencyId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Currency ID"),
    discountPercentage: z.number().min(0).max(100).optional().default(0),
    items: z.array(z.object({
        productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
        fixedPrice: z.number().min(0).optional(),
    })).optional(),
    isActive: z.boolean().optional().default(true),
});

const updatePricelistSchema = createPricelistSchema.partial();

module.exports = {
    createPricelistSchema,
    updatePricelistSchema,
};
