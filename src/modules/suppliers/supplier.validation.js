const { z } = require("zod");

const createSupplierSchema = z.object({
    supplierCode: z.string().min(2),
    supplierName: z.string().min(2),
    phoneNumber: z.string().optional().default(""),
    email: z.string().email().optional().or(z.literal("")).default(""),
    address: z.string().optional().default(""),
    paymentTerms: z.string().optional().default(""),
    companyName: z.string().optional().default(""),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
});

const updateSupplierSchema = z.object({
    supplierCode: z.string().min(2).optional(),
    supplierName: z.string().min(2).optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    address: z.string().optional(),
    paymentTerms: z.string().optional(),
    companyName: z.string().optional(),
    companyId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

const updateSupplierStatusSchema = z.object({
    status: z.enum(["ACTIVE", "INACTIVE"]),
});

module.exports = {
    createSupplierSchema,
    updateSupplierSchema,
    updateSupplierStatusSchema,
};
