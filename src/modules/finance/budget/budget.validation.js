const { z } = require("zod");

const createBudgetSchema = z.object({
    name: z.string().min(2),
    departmentName: z.string().min(2),
    fiscalYear: z.number(),
    allocatedAmount: z.number().min(0),
    spentAmount: z.number().optional(),
    status: z.enum(["OPEN", "CLOSED"]).optional(),
    notes: z.string().optional(),
});

const updateBudgetSchema = createBudgetSchema.partial();

module.exports = {
    createBudgetSchema,
    updateBudgetSchema,
};
