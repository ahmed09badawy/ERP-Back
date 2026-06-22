const service = require("./operation.service");
const {
    createOperationSchema,
    updateOperationSchema,
} = require("./operation.validation");

const createOperation = async (req, res) => {
    try {
        const validated = createOperationSchema.parse(req.body);

        const result = await service.createOperation(validated);

        res.status(201).json({
            success: true,
            message: "Operation created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllOperations = async (req, res) => {
    try {
        const result = await service.getAllOperations(req.query);

        res.status(200).json({
            success: true,
            message: "Operations fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getOperationById = async (req, res) => {
    try {
        const result = await service.getOperationById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Operation fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateOperation = async (req, res) => {
    try {
        const validated = updateOperationSchema.parse(req.body);

        const result = await service.updateOperation(req.params.id, validated);

        res.status(200).json({
            success: true,
            message: "Operation updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteOperation = async (req, res) => {
    try {
        await service.deleteOperation(req.params.id);

        res.status(200).json({
            success: true,
            message: "Operation deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createOperation,
    getAllOperations,
    getOperationById,
    updateOperation,
    deleteOperation,
};
