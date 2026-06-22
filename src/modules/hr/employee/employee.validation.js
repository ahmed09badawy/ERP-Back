const { z } = require("zod");

const documentSchema = z.object({
    documentType: z.string().min(1),
    documentNumber: z.string().min(1),
    issueDate: z.string().optional(),
    expiryDate: z.string().optional(),
});

const createEmployeeSchema = z.object({
    employeeCode: z.string().min(2),
    fullName: z.string().min(2),

    photo: z.string().optional().default(""),
    idNumber: z.string().optional().default(""),
    nationality: z.string().optional().default(""),
    gosiId : z.string().optional().default(""),

    birthDate: z.string().optional(),

    gender: z.enum(["MALE", "FEMALE"]).optional(),

    maritalStatus: z
        .enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"])
        .optional(),

    phoneNumber: z.string().optional().default(""),

    email: z
        .string()
        .email()
        .optional()
        .or(z.literal(""))
        .default(""),

    address: z.string().optional().default(""),

    employeeStatus: z
        .enum(["ACTIVE", "INACTIVE", "ON_LEAVE", "TERMINATED"])
        .optional()
        .default("ACTIVE"),

    companyId: z.string().min(1),
    branchId: z.string().min(1),
    departmentId: z.string().min(1),
    jobId: z.string().min(1),

    directManagerId: z.string().optional().nullable(),

    hireDate: z.string().optional(),

    contractStartDate: z.string().optional(),
    contractEndDate: z.string().optional(),
    terminationDate : z.string().optional(),
    contractType: z
        .enum(["PERMANENT", "TEMPORARY", "INTERN", "PART_TIME"])
        .optional(),

    internalEmployeeNumber: z.string().optional().default(""),
    jobGrade: z.string().optional().default(""),

    documents: z.array(documentSchema).optional().default([]),

    bankInfo: z
        .object({
            bankName: z.string().optional().default(""),
            accountNumber: z.string().optional().default(""),
        })
        .optional()
        .default({
            bankName: "",
            accountNumber: "",
        }),
});

const updateEmployeeSchema = createEmployeeSchema.partial();

module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema,
};
