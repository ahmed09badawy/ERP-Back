const { z } = require("zod");

const createMaterialRequirementSchema = z.object({
    material: z.string().min(1),
    description: z.string().min(1),
    bom_qty_per_unit: z.number().min(0),
    required_qty: z.number().min(0),
    available_qty: z.number().min(0),
    unit: z.enum(["kg", "pcs", "sheets", "meters", "liters"]),
    source: z.enum(["Warehouse 1", "Warehouse 2", "Supplier", "External"]),
    notes: z.string().min(1),
});

const updateMaterialRequirementSchema =
    createMaterialRequirementSchema.partial();

module.exports = {
    createMaterialRequirementSchema,
    updateMaterialRequirementSchema,
};
