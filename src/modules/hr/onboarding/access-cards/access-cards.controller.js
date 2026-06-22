const service = require("./access-cards.service");
const {
    createAccessCardSchema,
    updateAccessCardSchema,
} = require("./access-cards.validation");

const createAccessCard = async (req, res) => {
    const validated = createAccessCardSchema.parse(req.body);
    const result = await service.createAccessCard(validated);

    res.status(201).json({
        success: true,
        message: "Access card assigned successfully",
        data: result,
    });
};

const getAllAccessCards = async (req, res) => {
    const result = await service.getAllAccessCards(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getAccessCardById = async (req, res) => {
    const result = await service.getAccessCardById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateAccessCard = async (req, res) => {
    const validated = updateAccessCardSchema.parse(req.body);
    const result = await service.updateAccessCard(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Access card updated successfully",
        data: result,
    });
};

const deleteAccessCard = async (req, res) => {
    await service.deleteAccessCard(req.params.id);

    res.status(200).json({
        success: true,
        message: "Access card deleted successfully",
    });
};

module.exports = {
    createAccessCard,
    getAllAccessCards,
    getAccessCardById,
    updateAccessCard,
    deleteAccessCard,
};
