const { z } = require("zod");

const createUnitSchema = z.object({
    name: z.string().min(1),
    abbreviation: z.string().min(1),
    parentUnit: z.string().min(1),
    conversionFactor: z.number().min(0),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

const updateUnitSchema = z.object({
    name: z.string().optional(),
    abbreviation: z.string().optional(),
    parentUnit: z.string().optional(),
    conversionFactor: z.number().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

module.exports = {
    createUnitSchema,
    updateUnitSchema,
};
