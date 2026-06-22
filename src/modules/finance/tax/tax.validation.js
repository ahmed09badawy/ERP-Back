const { z } = require("zod");

const createTaxSchema = z.object({
    taxName: z.string().min(2),
    taxCode: z.string().min(2),
    taxType: z
        .enum(["VAT", "WITHHOLDING", "SALES_TAX"])
        .optional(),
    rate: z.number().min(0).max(100),
    isActive: z.boolean().optional(),
    notes: z.string().optional(),
});

const updateTaxSchema = createTaxSchema.partial();

module.exports = {
    createTaxSchema,
    updateTaxSchema,
};
