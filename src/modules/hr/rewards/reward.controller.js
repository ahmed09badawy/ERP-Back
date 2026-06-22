const service = require("./reward.service");
const {
    createRewardSchema,
    updateRewardSchema,
} = require("./reward.validation");

const createReward = async (req, res) => {
    const validated = createRewardSchema.parse(req.body);
    const result = await service.createReward(validated);

    res.status(201).json({
        success: true,
        message: "Reward created successfully",
        data: result,
    });
};

const getAllRewards = async (req, res) => {
    const result = await service.getAllRewards(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getRewardById = async (req, res) => {
    const result = await service.getRewardById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateReward = async (req, res) => {
    const validated = updateRewardSchema.parse(req.body);
    const result = await service.updateReward(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Reward updated successfully",
        data: result,
    });
};

const deleteReward = async (req, res) => {
    await service.deleteReward(req.params.id);

    res.status(200).json({
        success: true,
        message: "Reward deleted successfully",
    });
};

module.exports = {
    createReward,
    getAllRewards,
    getRewardById,
    updateReward,
    deleteReward,
};
