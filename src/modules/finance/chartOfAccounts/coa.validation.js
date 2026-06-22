const { z } = require("zod");

const createCoaSchema = z.object({
    accountCode: z.string().min(2),
    accountName: z.string().min(2),
    accountType: z.enum([
        "ASSET",
        "LIABILITY",
        "EQUITY",
        "REVENUE",
        "EXPENSE",
    ]),
    accountCategory: z
        .enum([
            "CASH",
            "BANK",
            "RECEIVABLE",
            "PAYABLE",
            "INVENTORY",
            "SALES",
            "COGS",
            "EXPENSE",
            "EQUITY",
            "OTHER",
        ])
        .optional()
        .default("OTHER"),
    paymentMethod: z.enum(["CASH", "BANK", "NONE"]).optional().default("NONE"),
    parentAccountId: z.string().optional().nullable(),
    level: z.number().optional(),
    isActive: z.boolean().optional(),
    notes: z.string().optional(),
});

const updateCoaSchema = createCoaSchema.partial();

module.exports = {
    createCoaSchema,
    updateCoaSchema,
};
