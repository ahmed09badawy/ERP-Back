const { z } = require("zod");

const createInventorySchema = z.object({
    customerCode: z.string().min(2),
    customerName: z.string().min(2),
    phoneNumber: z.string().optional().default(""),
    email: z.string().email().optional().or(z.literal("")).default(""),
    address: z.string().optional().default(""),
    companyName: z.string().optional().default(""),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
});

const updateInventorySchema = createInventorySchema.partial();

module.exports = {
    createInventorySchema,
    updateInventorySchema,
};
