const { z } = require("zod");

const createCompanySchema = z.object({
    name: z.string().min(2),
    taxNumber: z.string().optional().default(""),
    email: z.string().email().optional().or(z.literal("")).default(""),
    defaultCurrency: z.string().min(3).max(5).optional().default("EGP"),
});

const updateCompanySchema = z.object({
    name: z.string().min(2).optional(),
    taxNumber: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    defaultCurrency: z.string().min(3).max(5).optional(),
});

module.exports = {
    createCompanySchema,
    updateCompanySchema,
};
