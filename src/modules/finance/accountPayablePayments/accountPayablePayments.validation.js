const { z } = require("zod");

const createAPPaymentSchema = z.object({
    apInvoiceId: z.string(),
    paymentDate: z.string(),
    amount: z.number().min(0),
    paymentMethod: z
        .enum(["CASH", "BANK_TRANSFER", "CARD", "CHEQUE"])
        .optional(),
    referenceNumber: z.string().optional(),
    notes: z.string().optional(),
});

const updateAPPaymentSchema = createAPPaymentSchema.partial();

module.exports = {
    createAPPaymentSchema,
    updateAPPaymentSchema,
};
