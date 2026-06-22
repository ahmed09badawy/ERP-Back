const { z } = require("zod");

const createRoleSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional().default(""),
});

const updateRoleSchema = z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    state: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

const updateRoleStateSchema = z.object({
    state: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
    createRoleSchema,
    updateRoleSchema,
    updateRoleStateSchema,
};
