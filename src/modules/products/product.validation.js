const { z } = require("zod");

const createProductSchema = z.object({
    sku: z.string().min(2),
    productName: z.string().min(2),
    category: z.string().optional().default(""),
    productType: z.enum(["SERVICE", "STOCKABLE", "CONSUMABLE"]).optional().default("STOCKABLE"),
    salesPrice: z.number().min(0).optional().default(0),
    cost: z.number().min(0).optional().default(0),
    description: z.string().optional().default(""),
    unitOfMeasure: z.string().optional().default("Piece"),
    barcode: z.string().optional().default(""),
    companyName: z.string().optional().default(""),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    hasExpiry: z.boolean().optional().default(false),
});

const updateProductSchema = z.object({
    sku: z.string().min(2).optional(),
    productName: z.string().min(2).optional(),
    category: z.string().optional(),
    productType: z.enum(["SERVICE", "STOCKABLE", "CONSUMABLE"]).optional(),
    salesPrice: z.number().min(0).optional(),
    cost: z.number().min(0).optional(),
    description: z.string().optional(),
    unitOfMeasure: z.string().optional(),
    barcode: z.string().optional(),
    companyName: z.string().optional(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    hasExpiry: z.boolean().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

const updateProductStatusSchema = z.object({
    status: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
    createProductSchema,
    updateProductSchema,
    updateProductStatusSchema,
};
