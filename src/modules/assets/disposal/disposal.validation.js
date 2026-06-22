const { z } = require("zod");

const createDisposalSchema = z.object({
    assetId: z.string().min(1, "Asset ID is required"),
    currentValue: z.number().min(0, "Current value must be 0 or more"),
    purchaseCost: z.number().min(0, "Purchase cost must be 0 or more"),
    purchaseDate: z.string().min(1, "Purchase date is required"),
    disposalType: z.enum(["Sale", "Scrap", "Donation", "Retirement", "Transfer"]),
    disposalValue: z.number().min(0, "Disposal value must be 0 or more"),
    invoiceNumber: z.string().min(1, "Invoice number is required"),
    paymentMethod: z.enum(["Cash", "Bank Transfer", "Cheque", "Card"]),
    notes: z.string().min(1, "Notes is required"),
    attachments: z.array(z.string()).optional(),
});

const updateDisposalSchema = z.object({
    assetId: z.string().optional(),
    currentValue: z.number().min(0).optional(),
    purchaseCost: z.number().min(0).optional(),
    purchaseDate: z.string().optional(),
    disposalType: z.enum(["Sale", "Scrap", "Donation", "Retirement", "Transfer"]).optional(),
    disposalValue: z.number().min(0).optional(),
    invoiceNumber: z.string().optional(),
    paymentMethod: z.enum(["Cash", "Bank Transfer", "Cheque", "Card"]).optional(),
    notes: z.string().optional(),
    attachments: z.array(z.string()).optional(),
});

module.exports = {
    createDisposalSchema,
    updateDisposalSchema,
};
