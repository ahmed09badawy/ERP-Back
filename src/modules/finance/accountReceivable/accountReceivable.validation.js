const { z } = require("zod");

const createARSchema = z.object({
    contactId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Contact ID"),
    invoiceNumber: z.string().min(2),
    invoiceDate: z.string().optional(),
    dueDate: z.string(),
    currencyId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Currency ID"),
    exchangeRate: z.number().min(0).default(1),
    items: z.array(z.object({
        productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
        quantity: z.number().min(1),
        unitPrice: z.number().min(0).optional(),
        total: z.number().min(0).optional(),
    })),
    amount: z.number().min(0).optional(),
    paidAmount: z.number().optional(),
    paymentType: z.enum(["CASH", "CREDIT"]).optional().default("CREDIT"),
    cashAccountId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Account ID").optional(),
    notes: z.string().optional(),
});

const updateARSchema = z.object({
    contactId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Contact ID").optional(),
    invoiceNumber: z.string().min(2).optional(),
    invoiceDate: z.string().optional(),
    dueDate: z.string().optional(),
    currencyId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Currency ID").optional(),
    exchangeRate: z.number().min(0).optional(),
    items: z.array(z.object({
        productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
        quantity: z.number().min(1),
        unitPrice: z.number().min(0).optional(),
        total: z.number().min(0).optional(),
    })).optional(),
    amount: z.number().min(0).optional(),
    paidAmount: z.number().optional(),
    paymentType: z.enum(["CASH", "CREDIT"]).optional(),
    cashAccountId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Account ID").optional(),
    notes: z.string().optional(),
});

module.exports = {
    createARSchema,
    updateARSchema,
};
