const { z } = require("zod");

const journalLineSchema = z.object({
    accountId: z.string(),
    debit: z.number().optional().default(0),
    credit: z.number().optional().default(0),
    description: z.string().optional(),
});

const createJournalSchema = z.object({
    entryDate: z.string(),
    referenceNumber: z.string().min(2),
    memo: z.string().optional(),
    lines: z.array(journalLineSchema).min(2),
    status: z.enum(["DRAFT", "POSTED", "REVERSED"]).optional(),
});

const updateJournalSchema = createJournalSchema.partial();

module.exports = {
    createJournalSchema,
    updateJournalSchema,
};
