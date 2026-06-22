const { z } = require("zod");

const createRewardSchema = z.object({
    employeeInfo: z.string(),
    rewardsType: z.enum([
        "Performance Bonus",
        "Spot Reward",
        "Incentive Scheme",
        "Annual Bonus",
        "Other",
    ]),
    rewardDate: z.string(),
    rewardAmount: z.number().min(0),
    bonus: z.number().min(0).optional(),
    commissions: z.number().min(0).optional(),
});

const updateRewardSchema = createRewardSchema.partial();

module.exports = {
    createRewardSchema,
    updateRewardSchema,
};
