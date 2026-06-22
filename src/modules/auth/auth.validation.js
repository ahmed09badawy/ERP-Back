const { z } = require("zod");

const registerAdminSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

const resetPasswordSchema = z.object({
    newPassword: z.string().min(6),
});

module.exports = {
    registerAdminSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
};
