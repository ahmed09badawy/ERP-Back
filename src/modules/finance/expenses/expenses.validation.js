const { z } = require("zod");

const createExpensesSchema = z.object({
    date: z.string(),

    category: z.string().min(1, "Category is required"),

    payee: z.string().min(1, "Payee is required"),

    paymentMethod: z
        .enum(["Cash", "Bank Transfer", "Online"])
        .default("Cash"),

    note: z.string().optional().default(""),

    vatPercent: z.coerce.number().min(0).default(0),

    vatAmount: z.coerce.number().min(0).default(0),

    amount: z.coerce.number().positive(),

    currency: z.string().optional().default("USD"),

    status: z
        .enum(["Paid", "Unpaid", "partial"])
        .default("Unpaid"),
});

const updateExpensesSchema = createExpensesSchema.partial();

module.exports = {
    createExpensesSchema,
    updateExpensesSchema,
};
