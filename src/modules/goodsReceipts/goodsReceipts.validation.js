const { z } = require("zod");

const goodsReceiptItemSchema = z.object({
    productId: z.string().min(1),
    sku: z.string().optional().default(""),
    orderedQuantity: z.number().positive(),
    receivedQuantity: z.number().positive(),
    unitPrice: z.number().min(0),
});

const createGoodsReceiptSchema = z.object({
    grnNumber: z.string().min(2),
    purchaseOrderId: z.string().min(1),
    supplierId: z.string().min(1),
    receiptDate: z.string().optional(),
    warehouseId: z.string().min(1),
    branchId: z.string().optional().nullable(),
    items: z.array(goodsReceiptItemSchema).min(1),
    notes: z.string().optional().default(""),
});

const updateGoodsReceiptSchema = createGoodsReceiptSchema.partial();

module.exports = {
    createGoodsReceiptSchema,
    updateGoodsReceiptSchema,
};
