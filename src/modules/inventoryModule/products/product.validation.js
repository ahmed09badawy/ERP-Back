const { z } = require("zod");

const createProductSchema = z.object({
    image: z.string().optional().default(""),
    productName: z.string().min(1),
    barcode: z.string().min(1),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID"),
    defaultUnit: z.string().min(1),
    isStockItem: z.enum(["YES", "NO"]).optional().default("YES"),
    companyName: z.string().min(1),
    openingStock: z.number().min(0),
    reorderLevel: z.number().min(0),
    warehouseId: z.string().min(1),
    currentStockQty: z.number().min(0),
    expired: z.enum(["NO", "NEAR_EXPIRY", "EXPIRED"]).optional().default("NO"),
    purchasePrice: z.number().min(0),
    sellingPrice: z.number().min(0),
    description: z.string().min(1),
});

const updateProductSchema = z.object({
    image: z.string().optional(),
    productName: z.string().min(1).optional(),
    barcode: z.string().min(1).optional(),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID").optional(),
    defaultUnit: z.string().min(1).optional(),
    isStockItem: z.enum(["YES", "NO"]).optional(),
    companyName: z.string().min(1).optional(),
    openingStock: z.number().min(0).optional(),
    reorderLevel: z.number().min(0).optional(),
    warehouseId: z.string().min(1).optional(),
    currentStockQty: z.number().min(0).optional(),
    expired: z.enum(["NO", "NEAR_EXPIRY", "EXPIRED"]).optional(),
    purchasePrice: z.number().min(0).optional(),
    sellingPrice: z.number().min(0).optional(),
    description: z.string().min(1).optional(),
});

module.exports = {
    createProductSchema,
    updateProductSchema,
};
