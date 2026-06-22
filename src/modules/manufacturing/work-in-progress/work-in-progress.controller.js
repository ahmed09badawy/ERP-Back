const service = require("./work-in-progress.service");
const {
    createWipSchema,
    updateWipSchema,
} = require("./work-in-progress.validation");

const createWip = async (req, res) => {
    try {
        const validated = createWipSchema.parse(req.body);

        const result = await service.createWip(validated);

        res.status(201).json({
            success: true,
            message: "Work In Progress created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllWip = async (req, res) => {
    const result = await service.getAllWip(req.query);

    res.status(200).json({
        success: true,
        message: "WIP fetched successfully",
        data: result,
    });
};

const getWipById = async (req, res) => {
    try {
        const result = await service.getWipById(req.params.id);

        res.status(200).json({
            success: true,
            message: "WIP fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateWip = async (req, res) => {
    try {
        const validated = updateWipSchema.parse(req.body);

        const result = await service.updateWip(req.params.id, validated);

        res.status(200).json({
            success: true,
            message: "WIP updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteWip = async (req, res) => {
    try {
        await service.deleteWip(req.params.id);

        res.status(200).json({
            success: true,
            message: "WIP deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createWip,
    getAllWip,
    getWipById,
    updateWip,
    deleteWip,
};
