const service = require("./material-requirement.service");
const {
    createMaterialRequirementSchema,
    updateMaterialRequirementSchema,
} = require("./material-requirement.validation");

const createMaterialRequirement = async (req, res) => {
    try {
        const validated = createMaterialRequirementSchema.parse(req.body);

        const result = await service.createMaterialRequirement(validated);

        res.status(201).json({
            success: true,
            message: "Material Requirement created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllMaterialRequirements = async (req, res) => {
    try {
        const result = await service.getAllMaterialRequirements(req.query);

        res.status(200).json({
            success: true,
            message: "Material Requirements fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getMaterialRequirementById = async (req, res) => {
    try {
        const result = await service.getMaterialRequirementById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Material Requirement fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateMaterialRequirement = async (req, res) => {
    try {
        const validated = updateMaterialRequirementSchema.parse(req.body);

        const result = await service.updateMaterialRequirement(
            req.params.id,
            validated
        );

        res.status(200).json({
            success: true,
            message: "Material Requirement updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteMaterialRequirement = async (req, res) => {
    try {
        await service.deleteMaterialRequirement(req.params.id);

        res.status(200).json({
            success: true,
            message: "Material Requirement deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createMaterialRequirement,
    getAllMaterialRequirements,
    getMaterialRequirementById,
    updateMaterialRequirement,
    deleteMaterialRequirement,
};
