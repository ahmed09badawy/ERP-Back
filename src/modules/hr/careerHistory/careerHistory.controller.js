const service = require("./careerHistory.service");
const { createCareerHistorySchema } = require("./careerHistory.validation");

const createCareerHistory = async (req, res) => {
    const validatedData = createCareerHistorySchema.parse(req.body);
    const result = await service.createCareerHistory(validatedData);

    res.status(201).json({
        success: true,
        data: result,
    });
};

const getCareerHistory = async (req, res) => {
    const result = await service.getCareerHistory();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getCareerHistoryById = async (req, res) => {
    const result = await service.getCareerHistoryById(req.params.id);
    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateCareerHistory = async (req, res) => {
    const validatedData = updateCareerHistorySchema.parse(req.body);
    const result = await service.updateCareerHistory(req.params.id, validatedData);
    res.status(200).json({
        success: true,
        message: "Career history record updated successfully",
        data: result,
    });
};

const deleteCareerHistory = async (req, res) => {
    await service.deleteCareerHistory(req.params.id);
    res.status(200).json({
        success: true,
        message: "Career history record deleted successfully",
    });
};

module.exports = {
    createCareerHistory,
    getCareerHistory,
    getCareerHistoryById,
    updateCareerHistory,
    deleteCareerHistory,
};
