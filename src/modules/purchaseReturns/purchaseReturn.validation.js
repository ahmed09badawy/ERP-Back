const { z } = require("zod");

const purchaseReturnItemSchema = z.object({
    productId: z.string().min(1),
    sku: z.string().optional().default(""),
    receivedQuantity: z.number().positive(),
    returnQuantity: z.number().positive(),
    reasonForReturn: z.string().min(2),
});

const createPurchaseReturnSchema = z.object({
    returnNumber: z.string().min(2),
    returnDate: z.string().optional(),
    supplierId: z.string().min(1),
    goodsReceiptId: z.string().min(1),
    warehouseId: z.string().min(1),
    branchId: z.string().optional().nullable(),
    items: z.array(purchaseReturnItemSchema).min(1),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional().default("PENDING"),
    notes: z.string().optional().default(""),
});

const updatePurchaseReturnSchema = createPurchaseReturnSchema.partial();

module.exports = {
    createPurchaseReturnSchema,
    updatePurchaseReturnSchema,
};
