const { z } = require("zod");

const adjustmentSchema = z.object({
    type: z.enum(["AMOUNT", "PERCENT"]).default("AMOUNT"),
    value: z.number().min(0).default(0),
});

const createPosOrderSchema = z.object({
    warehouseId: z.string().min(1),
    customerId: z.string().min(1).optional(),
    companyId: z.string().min(1).optional(),
    branchId: z.string().min(1).optional(),
});

const addItemSchema = z
    .object({
        productId: z.string().min(1).optional(),
        barcode: z.string().min(1).optional(),
        qty: z.number().positive().default(1),
    })
    .refine((v) => Boolean(v.productId) || Boolean(v.barcode), {
        message: "Either productId or barcode is required",
        path: ["productId"],
    });

const updateItemQtySchema = z.object({
    qty: z.number().positive(),
});

const applyDiscountSchema = z.object({
    discount: adjustmentSchema,
});

const applyTaxSchema = z.object({
    tax: adjustmentSchema,
});

const applyShippingSchema = z.object({
    shippingAmount: z.number().min(0),
});

const holdSchema = z.object({
    reference: z.string().optional().default(""),
});

const paymentSchema = z.object({
    method: z.enum(["CASH", "MADA", "CREDIT_CARD", "APPLE_PAY"]),
    amountReceived: z.number().min(0).optional().default(0),
    card: z
        .object({
            cardBrand: z.string().optional().default(""),
            cardNumber: z.string().optional().default(""),
            expiryMonth: z.string().optional().default(""),
            expiryYear: z.string().optional().default(""),
            cvv: z.string().optional().default(""),
            cardHolderName: z.string().optional().default(""),
        })
        .optional()
        .default({}),
    applePay: z
        .object({
            device: z.string().optional().default(""),
            authorized: z.boolean().optional().default(false),
        })
        .optional()
        .default({}),
    transactionRef: z.string().optional().default(""),
});

module.exports = {
    createPosOrderSchema,
    addItemSchema,
    updateItemQtySchema,
    applyDiscountSchema,
    applyTaxSchema,
    applyShippingSchema,
    holdSchema,
    paymentSchema,
};

