const { z } = require("zod");

const salesOrderItemSchema = z.object({
    productId: z.string().min(1),
    sku: z.string().optional().default(""),
    quantity: z.number().positive(),
    unitPrice: z.number().min(0),
    discount: z.number().min(0).optional().default(0),
    tax: z.number().min(0).optional().default(0),
});

const createSalesOrderSchema = z.object({
    orderNo: z.string().min(2),
    customerId: z.string().min(1),
    orderDate: z.string().optional(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    warehouseId: z.string().optional().nullable(),
    items: z.array(salesOrderItemSchema).min(1),
    promoCode: z.string().optional().default(""),
    paymentStatus: z.enum(["PAID", "PENDING", "PARTIALLY_PAID", "UNPAID"]).optional().default("UNPAID"),
    deliveryStatus: z.enum(["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"]).optional().default("PENDING"),
    status: z.enum(["DRAFT", "CONFIRMED", "CANCELLED"]).optional().default("CONFIRMED"),
    notes: z.string().optional().default(""),
});

const updateSalesOrderSchema = createSalesOrderSchema.partial();

module.exports = {
    createSalesOrderSchema,
    updateSalesOrderSchema,
};
