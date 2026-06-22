const { z } = require("zod");

const quotationItemSchema = z.object({
    productId: z.string().min(1),
    qty: z.number().positive(),
    discount: z.number().min(0).optional().default(0),
});

const createQuotationSchema = z.object({
    quotationNo: z.string().min(2),
    customerId: z.string().min(1),
    quotationDate: z.string().optional(),
    expirationDate: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    items: z.array(quotationItemSchema).min(1),
    notes: z.string().optional().default(""),
    termsAndConditions: z.string().optional().default(""),
    status: z.enum(["DRAFT", "SENT", "EXPIRED"]).optional().default("DRAFT"),
});

const updateQuotationSchema = createQuotationSchema.partial();

module.exports = {
    createQuotationSchema,
    updateQuotationSchema,
};
