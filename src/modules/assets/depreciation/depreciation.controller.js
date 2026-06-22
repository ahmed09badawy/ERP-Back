const service = require("./depreciation.service");
const {
    createDepreciationSchema,
    updateDepreciationSchema,
} = require("./depreciation.validation");

const createDepreciation = async (req, res) => {
    try {
        const data = createDepreciationSchema.parse(req.body);

        const result = await service.createDepreciation(data);

        return res.status(201).json({
            success: true,
            message: "Depreciation created",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllDepreciations = async (req, res) => {
    try {
        const filters = {
            assetId: req.query.assetId,
        };

        const result = await service.getAllDepreciations(filters);

        return res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDepreciationById = async (req, res) => {
    try {
        const result = await service.getDepreciationById(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Not found",
            });
        }

        return res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateDepreciation = async (req, res) => {
    try {
        const data = updateDepreciationSchema.parse(req.body);

        const result = await service.updateDepreciation(req.params.id, data);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Not found",
            });
        }

        return res.json({
            success: true,
            message: "Updated successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteDepreciation = async (req, res) => {
    try {
        const result = await service.deleteDepreciation(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Not found",
            });
        }

        return res.json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createDepreciation,
    getAllDepreciations,
    getDepreciationById,
    updateDepreciation,
    deleteDepreciation,
};
