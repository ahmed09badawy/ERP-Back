const service = require("./initial-training.service");
const {
    createInitialTrainingSchema,
    updateInitialTrainingSchema,
} = require("./initial-training.validation");

const createInitialTraining = async (req, res) => {
    const validated = createInitialTrainingSchema.parse(req.body);
    const result = await service.createInitialTraining(validated);

    res.status(201).json({
        success: true,
        message: "Initial training created successfully",
        data: result,
    });
};

const getAllInitialTrainings = async (req, res) => {
    const result = await service.getAllInitialTrainings(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getInitialTrainingById = async (req, res) => {
    const result = await service.getInitialTrainingById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateInitialTraining = async (req, res) => {
    const validated = updateInitialTrainingSchema.parse(req.body);
    const result = await service.updateInitialTraining(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Initial training updated successfully",
        data: result,
    });
};

const deleteInitialTraining = async (req, res) => {
    await service.deleteInitialTraining(req.params.id);

    res.status(200).json({
        success: true,
        message: "Initial training deleted successfully",
    });
};

module.exports = {
    createInitialTraining,
    getAllInitialTrainings,
    getInitialTrainingById,
    updateInitialTraining,
    deleteInitialTraining,
};
