const { z } = require("zod");

const salesInvoiceItemSchema = z.object({
    productId: z.string().min(1),
    sku: z.string().optional().default(""),
    quantity: z.number().positive(),
    unitPrice: z.number().min(0),
    discount: z.number().min(0).optional().default(0),
    tax: z.number().min(0).optional().default(0),
});

const createSalesInvoiceSchema = z.object({
    invoiceNumber: z.string().min(2),
    salesOrderId: z.string().optional().nullable(),
    customerId: z.string().min(1),
    warehouseId: z.string().optional().nullable(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    issuedDate: z.string().optional(),
    dueDate: z.string().optional().nullable(),
    items: z.array(salesInvoiceItemSchema).min(1),
    paymentStatus: z.enum(["PAID", "UNPAID", "PARTIALLY_PAID"]).optional().default("UNPAID"),
    notes: z.string().optional().default(""),
});

const updateSalesInvoiceSchema = createSalesInvoiceSchema.partial();

module.exports = {
    createSalesInvoiceSchema,
    updateSalesInvoiceSchema,
};
