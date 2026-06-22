const { z } = require("zod");

const createCurrencySchema = z.object({
    code: z.string(),
    name: z.string(),
    symbol: z.string().optional(),
    isBaseCurrency: z.boolean().optional(),
});

const updateCurrencySchema = createCurrencySchema.partial();

module.exports = {
    createCurrencySchema,
    updateCurrencySchema,
};
