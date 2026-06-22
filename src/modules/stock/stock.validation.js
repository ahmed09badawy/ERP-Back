const { z } = require("zod");

const stockInSchema = z.object({
    productId: z.string().min(1),
    warehouseId: z.string().min(1),
    qty: z.number().positive(),
    unitCost: z.number().min(0).optional().default(0),
    referenceType: z.string().optional().default(""),
    referenceId: z.string().optional().default(""),
    notes: z.string().optional().default(""),
});

const stockOutSchema = z.object({
    productId: z.string().min(1),
    warehouseId: z.string().min(1),
    qty: z.number().positive(),
    referenceType: z.string().optional().default(""),
    referenceId: z.string().optional().default(""),
    notes: z.string().optional().default(""),
});

const reserveStockSchema = z.object({
    productId: z.string().min(1),
    warehouseId: z.string().min(1),
    qty: z.number().positive(),
    referenceType: z.string().optional().default(""),
    referenceId: z.string().optional().default(""),
    notes: z.string().optional().default(""),
});

const releaseStockSchema = z.object({
    productId: z.string().min(1),
    warehouseId: z.string().min(1),
    qty: z.number().positive(),
    referenceType: z.string().optional().default(""),
    referenceId: z.string().optional().default(""),
    notes: z.string().optional().default(""),
});

module.exports = {
    stockInSchema,
    stockOutSchema,
    reserveStockSchema,
    releaseStockSchema,
};
