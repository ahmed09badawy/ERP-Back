const { z } = require("zod");

const createARPaymentSchema = z.object({
    arInvoiceId: z.string(),
    paymentDate: z.string(),
    amount: z.number().min(0),
    paymentMethod: z
        .enum(["CASH", "BANK_TRANSFER", "CARD", "CHEQUE"])
        .optional(),
    referenceNumber: z.string().optional(),
    notes: z.string().optional(),
});

const updateARPaymentSchema = createARPaymentSchema.partial();

module.exports = {
    createARPaymentSchema,
    updateARPaymentSchema,
};
