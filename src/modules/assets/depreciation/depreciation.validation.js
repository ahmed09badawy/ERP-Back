const { z } = require("zod");

const createDepreciationSchema = z.object({
    assetId: z.string().min(1),
    purchaseCost: z.number().min(0),
    usefulLife: z.string().min(1),
    depreciationMethod: z.enum([
        "Straight Line",
        "Declining Balance",
        "Units of Production",
    ]),
    accumulatedDepreciation: z.number().min(0),
    currentValue: z.number().min(0),
    accountingPeriod: z.enum(["Month", "Quarter", "Year"]),
});

const updateDepreciationSchema = z.object({
    assetId: z.string().optional(),
    purchaseCost: z.number().optional(),
    usefulLife: z.string().optional(),
    depreciationMethod: z.enum([
        "Straight Line",
        "Declining Balance",
        "Units of Production",
    ]).optional(),
    accumulatedDepreciation: z.number().optional(),
    currentValue: z.number().optional(),
    accountingPeriod: z.enum(["Month", "Quarter", "Year"]).optional(),
});

module.exports = {
    createDepreciationSchema,
    updateDepreciationSchema,
};
