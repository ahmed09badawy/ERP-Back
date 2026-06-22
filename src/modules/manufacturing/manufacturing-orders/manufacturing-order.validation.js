const { z } = require("zod");

const createManufacturingOrderSchema = z.object({
    product_name: z.string().min(1),
    planned_quantity: z.number().positive(),
    produced_quantity: z.number().min(0),
    cost_summary: z.number().min(0),
    bom_used: z.string().min(1),
    work_center: z.string().min(1),
    start_date: z.string().min(1),
    end_date: z.string().min(1),
    responsible: z.string().min(1),
    raw_material_availability: z.enum([
        "Available",
        "Partially Available",
        "Not Available",
    ]),
    state: z.enum(["Draft", "In Progress", "Done", "Cancelled"]),
});

const updateManufacturingOrderSchema = z.object({
    product_name: z.string().min(1).optional(),
    planned_quantity: z.number().positive().optional(),
    produced_quantity: z.number().min(0).optional(),
    cost_summary: z.number().min(0).optional(),
    bom_used: z.string().min(1).optional(),
    work_center: z.string().min(1).optional(),
    start_date: z.string().min(1).optional(),
    end_date: z.string().min(1).optional(),
    responsible: z.string().min(1).optional(),
    raw_material_availability: z
        .enum(["Available", "Partially Available", "Not Available"])
        .optional(),
    state: z.enum(["Draft", "In Progress", "Done", "Cancelled"]).optional(),
});

module.exports = {
    createManufacturingOrderSchema,
    updateManufacturingOrderSchema,
};
