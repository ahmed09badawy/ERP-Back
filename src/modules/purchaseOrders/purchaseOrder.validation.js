const { z } = require("zod");

const purchaseOrderItemSchema = z.object({
  productId: z.string().min(1),
  sku: z.string().optional().default(""),
  quantity: z.number().positive(),
  unitCost: z.number().min(0),
  tax: z.number().min(0).optional().default(0),
});

const createPurchaseOrderSchema = z.object({
  referenceNo: z.string().min(2),
  supplierId: z.string().min(1),
  linkedPurchaseRequestId: z.string().optional().nullable(),
  orderDate: z.string().optional(),
  companyId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  items: z.array(purchaseOrderItemSchema).min(1),
  paymentStatus: z.enum(["PAID", "UNPAID", "PARTIAL"]).optional().default("UNPAID"),
  notes: z.string().optional().default(""),
});

const updatePurchaseOrderSchema = z.object({
  supplierId: z.string().min(1).optional(),
  linkedPurchaseRequestId: z.string().optional().nullable(),
  orderDate: z.string().optional(),
  companyId: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  items: z.array(purchaseOrderItemSchema).min(1).optional(),
  paymentStatus: z.enum(["PAID", "UNPAID", "PARTIAL"]).optional(),
  deliveryStatus: z
    .enum(["PENDING", "PROCESSING", "PARTIALLY_DELIVERED", "DELIVERED", "CANCELLED"])
    .optional(),
  notes: z.string().optional(),
});

module.exports = {
  createPurchaseOrderSchema,
  updatePurchaseOrderSchema,
};
