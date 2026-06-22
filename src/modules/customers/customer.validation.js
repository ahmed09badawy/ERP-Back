const { z } = require("zod");

const createCustomerSchema = z.object({
    customerCode: z.string().min(2),
    customerName: z.string().min(2),
    phoneNumber: z.string().optional().default(""),
    email: z.string().email().optional().or(z.literal("")).default(""),
    address: z.string().optional().default(""),
    companyName: z.string().optional().default(""),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
});

const updateCustomerSchema = z.object({
    customerCode: z.string().min(2).optional(),
    customerName: z.string().min(2).optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    address: z.string().optional(),
    companyName: z.string().optional(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

const updateCustomerStatusSchema = z.object({
    status: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
    createCustomerSchema,
    updateCustomerSchema,
    updateCustomerStatusSchema,
};
