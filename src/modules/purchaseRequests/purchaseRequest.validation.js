const { z } = require("zod");

const purchaseRequestItemSchema = z.object({
    productId: z.string().optional().nullable(),
    itemName: z.string().min(2),
    requiredQuantity: z.number().positive(),
    estimatedUnitCost: z.number().min(0).optional().default(0),
});

const createPurchaseRequestSchema = z.object({
    prNumber: z.string().min(2),
    requestDate: z.string().optional(),
    department: z.string().optional().default(""),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    items: z.array(purchaseRequestItemSchema).min(1),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
    notes: z.string().optional().default(""),
});

const updatePurchaseRequestSchema = createPurchaseRequestSchema.partial();

module.exports = {
    createPurchaseRequestSchema,
    updatePurchaseRequestSchema,
};
