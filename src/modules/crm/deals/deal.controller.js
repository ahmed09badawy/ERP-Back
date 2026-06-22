const service = require("./deal.service");
const {
    createDealSchema,
    updateDealSchema,
} = require("./deal.validation");

const createDeal = async (req, res) => {
    const validated = createDealSchema.parse(req.body);
    const result = await service.createDeal(validated);

    res.status(201).json({
        success: true,
        message: "Deal created successfully",
        data: result,
    });
};

const getAllDeals = async (req, res) => {
    const result = await service.getAllDeals(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getDealById = async (req, res) => {
    const result = await service.getDealById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateDeal = async (req, res) => {
    const validated = updateDealSchema.parse(req.body);
    const result = await service.updateDeal(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Deal updated successfully",
        data: result,
    });
};

const deleteDeal = async (req, res) => {
    await service.deleteDeal(req.params.id);

    res.status(200).json({
        success: true,
        message: "Deal deleted successfully",
    });
};

module.exports = {
    createDeal,
    getAllDeals,
    getDealById,
    updateDeal,
    deleteDeal,
};
