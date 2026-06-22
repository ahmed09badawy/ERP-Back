const Deal = require("./deal.model");
const Counter = require("../../assets/counter.model");

const generateDealCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "deal" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `DEAL-${String(counter.seq).padStart(4, "0")}`;
};

const createDeal = async (data) => {
    data.dealCode = await generateDealCode();
    return await Deal.create(data);
};

const getAllDeals = async (query) => {
    const { page = 1, limit = 10 } = query;

    const deals = await Deal.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    return deals;
};

const getDealById = async (id) => {
    return await Deal.findById(id);
};

const updateDeal = async (id, data) => {
    return await Deal.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

const deleteDeal = async (id) => {
    return await Deal.findByIdAndUpdate(id, { isDeleted: true });
};

module.exports = {
    createDeal,
    getAllDeals,
    getDealById,
    updateDeal,
    deleteDeal,
};
