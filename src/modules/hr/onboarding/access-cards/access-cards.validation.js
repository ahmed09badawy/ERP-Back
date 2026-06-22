const { z } = require("zod");

const createAccessCardSchema = z.object({
    employeeInfo: z.string(),
    cardNumber: z.string(),
    doneBy: z.string(),
    status: z.enum(["Pending", "Done", "Canceled"]).optional(),
    doneAt: z.string().optional(),
});

const updateAccessCardSchema = createAccessCardSchema.partial();

module.exports = {
    createAccessCardSchema,
    updateAccessCardSchema,
};
