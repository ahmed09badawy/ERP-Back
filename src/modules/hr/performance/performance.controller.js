const service = require("./performance..service");
const { createPerformanceSchema, updatePerformanceSchema } = require("./performance.validation");

const createPerformance = async (req, res) => {
    const validatedData = createPerformanceSchema.parse(req.body);
    const result = await service.createPerformance(validatedData);

    res.status(201).json({
        success: true,
        message: "Performance created successfully",
        data: result,
    });
};

const getAllPerformance = async (req, res) => {
    const result = await service.getAllPerformance();

    res.status(200).json({
        success: true,
        message: "Performance records retrieved successfully",
        data: result,
    });
};

const getPerformanceById = async (req, res) => {
    const result = await service.getPerformanceById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Performance record details retrieved successfully",
        data: result,
    });
};

const updatePerformance = async (req, res) => {
    const validatedData = updatePerformanceSchema.parse(req.body);
    const result = await service.updatePerformance(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Performance record updated successfully",
        data: result,
    });
};

const deletePerformance = async (req, res) => {
    await service.deletePerformance(req.params.id);

    res.status(200).json({
        success: true,
        message: "Performance record deleted successfully",
    });
};

module.exports = {
    createPerformance,
    getAllPerformance,
    getPerformanceById,
    updatePerformance,
    deletePerformance,
};
