const { z } = require("zod");

const salesReturnItemSchema = z.object({
    productId: z.string().min(1),
    sku: z.string().optional().default(""),
    invoicedQuantity: z.number().positive(),
    returnQuantity: z.number().positive(),
    unitPrice: z.number().min(0),
    reasonForReturn: z.string().min(2),
});

const createSalesReturnSchema = z.object({
    returnNumber: z.string().min(2),
    originalInvoiceId: z.string().min(1),
    customerId: z.string().min(1),
    warehouseId: z.string().min(1),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    returnDate: z.string().optional(),
    items: z.array(salesReturnItemSchema).min(1),
    refundStatus: z
        .enum(["PENDING", "REFUNDED", "PARTIAL_REFUND", "REJECTED"])
        .optional()
        .default("PENDING"),
    notes: z.string().optional().default(""),
});

const updateSalesReturnSchema = createSalesReturnSchema.partial();

module.exports = {
    createSalesReturnSchema,
    updateSalesReturnSchema,
};
