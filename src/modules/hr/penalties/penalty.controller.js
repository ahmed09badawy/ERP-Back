const service = require("./penalty.service");
const {
    createPenaltySchema,
    updatePenaltySchema,
} = require("./penalty.validation");

const createPenalty = async (req, res) => {
    const validated = createPenaltySchema.parse(req.body);
    const result = await service.createPenalty(validated);

    res.status(201).json({
        success: true,
        message: "Penalty created successfully",
        data: result,
    });
};

const getAllPenalties = async (req, res) => {
    const result = await service.getAllPenalties(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getPenaltyById = async (req, res) => {
    const result = await service.getPenaltyById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updatePenalty = async (req, res) => {
    const validated = updatePenaltySchema.parse(req.body);
    const result = await service.updatePenalty(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Penalty updated successfully",
        data: result,
    });
};

const deletePenalty = async (req, res) => {
    await service.deletePenalty(req.params.id);

    res.status(200).json({
        success: true,
        message: "Penalty deleted successfully",
    });
};

module.exports = {
    createPenalty,
    getAllPenalties,
    getPenaltyById,
    updatePenalty,
    deletePenalty,
};
