const service = require("./work-center.service");
const {
    createWorkCenterSchema,
    updateWorkCenterSchema,
} = require("./work-center.validation");

const createWorkCenter = async (req, res) => {
    try {
        const validated = createWorkCenterSchema.parse(req.body);

        const result = await service.createWorkCenter(validated);

        res.status(201).json({
            success: true,
            message: "Work Center created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllWorkCenters = async (req, res) => {
    const result = await service.getAllWorkCenters(req.query);

    res.status(200).json({
        success: true,
        message: "Work Centers fetched successfully",
        data: result,
    });
};

const getWorkCenterById = async (req, res) => {
    try {
        const result = await service.getWorkCenterById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Work Center fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateWorkCenter = async (req, res) => {
    try {
        const validated = updateWorkCenterSchema.parse(req.body);

        const result = await service.updateWorkCenter(req.params.id, validated);

        res.status(200).json({
            success: true,
            message: "Work Center updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteWorkCenter = async (req, res) => {
    try {
        await service.deleteWorkCenter(req.params.id);

        res.status(200).json({
            success: true,
            message: "Work Center deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createWorkCenter,
    getAllWorkCenters,
    getWorkCenterById,
    updateWorkCenter,
    deleteWorkCenter,
};
