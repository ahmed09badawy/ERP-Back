const { z } = require("zod");

const createWorkCenterSchema = z.object({
    code: z.string().optional(),
    name: z.string().min(1),
    machine_type: z.string().min(1),
    capacity_per_hour: z.number().positive(),
    location: z.string().min(1),
    state: z.enum(["Active", "Inactive"]),
});

const updateWorkCenterSchema = z.object({
    code: z.string().optional(),
    name: z.string().optional(),
    machine_type: z.string().optional(),
    capacity_per_hour: z.number().positive().optional(),
    location: z.string().optional(),
    state: z.enum(["Active", "Inactive"]).optional(),
});

module.exports = {
    createWorkCenterSchema,
    updateWorkCenterSchema,
};
