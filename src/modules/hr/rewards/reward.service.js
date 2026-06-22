const Reward = require("./reward.model");

const generateRewardId = async () => {
    const count = await Reward.countDocuments();
    return `REW-${String(count + 1).padStart(4, "0")}`;
};

const createReward = async (data) => {
    data.rewardsId = await generateRewardId();
    return await Reward.create(data);
};

const getAllRewards = async (query) => {
    const { page = 1, limit = 10, employeeInfo, rewardsType, date } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (rewardsType) filter.rewardsType = rewardsType;

    if (date) {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);
        filter.rewardDate = { $gte: start, $lt: end };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const rewards = await Reward.find(filter)
        .populate("employeeInfo")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Reward.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: rewards,
    };
};

const getRewardById = async (id) => {
    const reward = await Reward.findOne({ _id: id, isDeleted: false }).populate("employeeInfo");

    if (!reward) {
        throw new Error("Reward not found");
    }

    return reward;
};

const updateReward = async (id, data) => {
    const reward = await Reward.findOne({ _id: id, isDeleted: false });

    if (!reward) {
        throw new Error("Reward not found");
    }

    Object.assign(reward, data);
    await reward.save();

    return reward;
};

const deleteReward = async (id) => {
    const reward = await Reward.findOne({ _id: id, isDeleted: false });

    if (!reward) {
        throw new Error("Reward not found");
    }

    reward.isDeleted = true;
    await reward.save();

    return true;
};

module.exports = {
    createReward,
    getAllRewards,
    getRewardById,
    updateReward,
    deleteReward,
};
