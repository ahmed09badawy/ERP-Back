const { z } = require("zod");

const createBillOfMaterialsSchema = z.object({
    product_name: z.string().min(1),
    component_item: z.string().min(1),
    qty: z.number().positive(),
    uom: z.enum(["kg", "pcs", "liters"]),
    version: z.string().min(1),
    notes: z.string().min(1),
});

const updateBillOfMaterialsSchema = z.object({
    product_name: z.string().optional(),
    component_item: z.string().optional(),
    qty: z.number().positive().optional(),
    uom: z.enum(["kg", "pcs", "liters"]).optional(),
    version: z.string().optional(),
    notes: z.string().optional(),
});

module.exports = {
    createBillOfMaterialsSchema,
    updateBillOfMaterialsSchema,
};
