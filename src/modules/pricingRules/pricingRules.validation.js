const { z } = require("zod");

const createPricingRuleSchema = z.object({
    ruleName: z.string().min(2),
    appliesTo: z.enum(["PRODUCT", "CUSTOMER", "CATEGORY"]),
    productId: z.string().optional().nullable(),
    customerId: z.string().optional().nullable(),
    minQty: z.number().min(1).optional().default(1),
    priceType: z.enum(["FIXED", "PERCENTAGE"]),
    value: z.number().positive(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
});

const updatePricingRuleSchema = createPricingRuleSchema.partial();

module.exports = {
    createPricingRuleSchema,
    updatePricingRuleSchema,
};
