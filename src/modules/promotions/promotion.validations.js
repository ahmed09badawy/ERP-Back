const { z } = require("zod");

const createPromotionSchema = z.object({
    promotionName: z.string().min(2),
    type: z.enum(["PERCENTAGE", "FIXED", "BUY_X_GET_Y", "FREE_SHIPPING"]),
    conditionType: z.enum(["ORDER_TOTAL", "PRODUCT_QTY", "CUSTOMER", "PROMO_CODE"]),
    productId: z.string().optional().nullable(),
    customerId: z.string().optional().nullable(),
    promoCode: z.string().optional().default(""),
    minOrderTotal: z.number().min(0).optional().default(0),
    minQty: z.number().min(0).optional().default(0),
    value: z.number().min(0).optional().default(0),
    benefitDescription: z.string().optional().default(""),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(["ACTIVE", "SCHEDULED", "EXPIRED", "INACTIVE"]).optional().default("ACTIVE"),
});

const updatePromotionSchema = createPromotionSchema.partial();

module.exports = {
    createPromotionSchema,
    updatePromotionSchema,
};  
