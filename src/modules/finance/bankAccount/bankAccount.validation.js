const { z } = require("zod");

const createBankSchema = z.object({
    accountName: z.string(),
    bankName: z.string(),
    accountNumber: z.string(),
    iban: z.string().optional(),
    currency: z.string().optional(),
    balance: z.number().optional(),
    isActive: z.boolean().optional(),
});

const updateBankSchema = createBankSchema.partial();

module.exports = {
    createBankSchema,
    updateBankSchema,
};
