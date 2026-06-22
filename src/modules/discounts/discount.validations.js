const { z } = require("zod");

const createDiscountSchema = z.object({
    discountName: z.string().min(2),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    appliesTo: z.enum(["PRODUCT", "CUSTOMER", "ORDER_TOTAL"]),
    productId: z.string().optional().nullable(),
    customerId: z.string().optional().nullable(),
    value: z.number().min(0),
    minOrderTotal: z.number().min(0).optional().default(0),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "EXPIRED"]).optional().default("ACTIVE"),
});

const updateDiscountSchema = createDiscountSchema.partial();

module.exports = {
    createDiscountSchema,
    updateDiscountSchema,
};
