const { z } = require("zod");

const createCostCenterSchema = z.object({
    name: z.string().min(1),
    code: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(["Active", "Inactive"]).default("Active"),
});

const updateCostCenterSchema = z.object({
    name: z.string().optional(),
    code: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
});

module.exports = {
    createCostCenterSchema,
    updateCostCenterSchema,
};
