const { z } = require("zod");

const createIncomeSchema = z.object({
    date: z.string(),

    note: z.string().optional().default(""),

    source: z.string().min(1, "Source is required"),

    paymentMethod: z
        .enum(["Cash", "Bank Transfer", "Online"])
        .default("Cash"),

    companyName: z.string().min(1, "Company name is required"),

    vatPercent: z.number().min(0).optional().default(0),

    vatAmount: z.number().min(0).optional().default(0),

    amount: z.number().positive(),

    currency: z.string().optional().default("USD"),

    status: z
        .enum(["Paid", "Unpaid", "partial"])
        .default("Unpaid"),
});

const updateIncomeSchema = createIncomeSchema.partial();

module.exports = {
    createIncomeSchema,
    updateIncomeSchema,
};
