const { z } = require("zod");

const createPipelineSchema = z.object({
    pipelineName: z.string(),
    totalDealValue: z.number(),
    numberOfDeals: z.number(),
    stage: z.enum(["Win", "Lost", "In Pipeline"]).optional(),
});

const updatePipelineSchema = createPipelineSchema.partial();

module.exports = {
    createPipelineSchema,
    updatePipelineSchema,
};
