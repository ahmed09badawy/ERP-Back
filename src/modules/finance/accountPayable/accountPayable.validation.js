const { z } = require("zod");

const createAPSchema = z.object({
    vendorName: z.string().min(2),
    invoiceNumber: z.string().min(2),
    invoiceDate: z.string(),
    dueDate: z.string(),
    amount: z.number().min(0),
    paidAmount: z.number().optional(),
    status: z.enum(["PENDING", "PARTIAL", "PAID", "OVERDUE"]).optional(),
    notes: z.string().optional(),
});

const updateAPSchema = createAPSchema.partial();

module.exports = {
    createAPSchema,
    updateAPSchema,
};
