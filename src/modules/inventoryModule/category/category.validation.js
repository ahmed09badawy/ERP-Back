const { z } = require("zod");

const createCategorySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional().default(""),
    incomeAccountId: z.string().min(1, "Income Account is required"),
    expenseAccountId: z.string().min(1, "Expense Account is required"),
    inventoryValuationAccountId: z.string().min(1, "Inventory Valuation Account is required"),
    costOfGoodsSoldAccountId: z.string().min(1, "COGS Account is required"),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
});

const updateCategorySchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    incomeAccountId: z.string().optional(),
    expenseAccountId: z.string().optional(),
    inventoryValuationAccountId: z.string().optional(),
    costOfGoodsSoldAccountId: z.string().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

module.exports = {
    createCategorySchema,
    updateCategorySchema,
};
