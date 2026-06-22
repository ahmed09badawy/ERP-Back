const { z } = require("zod");

const purchaseInvoiceItemSchema = z.object({
    productId: z.string().min(1),
    sku: z.string().optional().default(""),
    quantity: z.number().positive(),
    unitCost: z.number().min(0),
    tax: z.number().min(0).optional().default(0),
});

const createPurchaseInvoiceSchema = z.object({
    invoiceNo: z.string().min(2),
    supplierId: z.string().min(1),
    purchaseOrderId: z.string().optional().nullable(),
    invoiceDate: z.string().optional(),
    dueDate: z.string().optional(),
    warehouseId: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    items: z.array(purchaseInvoiceItemSchema).min(1),
    paymentStatus: z.enum(["PAID", "UNPAID", "PARTIAL", "OVERDUE"]).optional().default("UNPAID"),
    deliveryStatus: z.enum(["DELIVERED", "PROCESSING", "CANCELLED"]).optional().default("PROCESSING"),
    discountAmount: z.number().min(0).optional().default(0),
    notes: z.string().optional().default(""),
});

const updatePurchaseInvoiceSchema = z.object({
    supplierId: z.string().min(1).optional(),
    purchaseOrderId: z.string().optional().nullable(),
    invoiceDate: z.string().optional(),
    dueDate: z.string().optional(),
    warehouseId: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    items: z.array(purchaseInvoiceItemSchema).min(1).optional(),
    paymentStatus: z.enum(["PAID", "UNPAID", "PARTIAL", "OVERDUE"]).optional(),
    deliveryStatus: z.enum(["DELIVERED", "PROCESSING", "CANCELLED"]).optional(),
    discountAmount: z.number().min(0).optional(),
    notes: z.string().optional(),
});

module.exports = {
    createPurchaseInvoiceSchema,
    updatePurchaseInvoiceSchema,
};
