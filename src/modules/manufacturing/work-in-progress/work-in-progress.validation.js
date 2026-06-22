const { z } = require("zod");

const createWipSchema = z.object({
    product: z.string().min(1),
    planned_qty: z.number().positive(),
    produced_qty: z.number().min(0),
    scrap_qty: z.number().min(0),
    start_date: z.string().min(1),
    expected_end_date: z.string().min(1),
    notes: z.string().optional(),
});

const updateWipSchema = z.object({
    product: z.string().min(1).optional(),
    planned_qty: z.number().positive().optional(),
    produced_qty: z.number().min(0).optional(),
    scrap_qty: z.number().min(0).optional(),
    start_date: z.string().min(1).optional(),
    expected_end_date: z.string().min(1).optional(),
    notes: z.string().optional(),
});

module.exports = {
    createWipSchema,
    updateWipSchema,
};
