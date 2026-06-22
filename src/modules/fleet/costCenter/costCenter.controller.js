const service = require("./costCenter.service");
const {
    createCostCenterSchema,
    updateCostCenterSchema,
} = require("./costCenter.validation");

const createCostCenter = async (req, res) => {
    const validated = createCostCenterSchema.parse(req.body);

    const result = await service.createCostCenter(validated);

    res.status(201).json({
        success: true,
        message: "Cost center created successfully",
        data: result,
    });
};

const getAllCostCenters = async (req, res) => {
    const result = await service.getAllCostCenters(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getCostCenterById = async (req, res) => {
    const result = await service.getCostCenterById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateCostCenter = async (req, res) => {
    const validated = updateCostCenterSchema.parse(req.body);

    const result = await service.updateCostCenter(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Cost center updated successfully",
        data: result,
    });
};

const deleteCostCenter = async (req, res) => {
    const result = await service.deleteCostCenter(req.params.id);

    res.status(200).json({
        success: true,
        message: "Cost center deleted successfully",
    });
};

module.exports = {
    createCostCenter,
    getAllCostCenters,
    getCostCenterById,
    updateCostCenter,
    deleteCostCenter,
};
