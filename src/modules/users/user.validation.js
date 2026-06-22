const { z } = require("zod");

const createUserSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    roleId: z.string().min(1),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
});

const updateUserSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    roleId: z.string().optional(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    state: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

const updateUserStateSchema = z.object({
    state: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    updateUserStateSchema,
};
