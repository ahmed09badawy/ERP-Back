const { z } = require("zod");

const createBranchSchema = z.object({
    companyId: z.string().min(1),
    name: z.string().min(2),
    email: z.string().email().optional().or(z.literal("")).default(""),
    address: z.string().optional().default(""),
});

const updateBranchSchema = z.object({
    companyId: z.string().optional(),
    name: z.string().min(2).optional(),
    email: z.string().email().optional().or(z.literal("")),
    address: z.string().optional(),
    state: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

const updateBranchStateSchema = z.object({
    state: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
    createBranchSchema,
    updateBranchSchema,
    updateBranchStateSchema,
};
