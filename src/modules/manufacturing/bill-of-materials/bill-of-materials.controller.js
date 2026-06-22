const service = require("./bill-of-materials.service");
const {
    createBillOfMaterialsSchema,
    updateBillOfMaterialsSchema,
} = require("./bill-of-materials.validation");

const createBillOfMaterials = async (req, res) => {
    try {
        const validated = createBillOfMaterialsSchema.parse(req.body);

        const result = await service.createBillOfMaterials(validated);

        res.status(201).json({
            success: true,
            message: "BOM created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllBillOfMaterials = async (req, res) => {
    const result = await service.getAllBillOfMaterials(req.query);

    res.status(200).json({
        success: true,
        message: "BOM list fetched successfully",
        data: result,
    });
};

const getBillOfMaterialsById = async (req, res) => {
    try {
        const result = await service.getBillOfMaterialsById(req.params.id);

        res.status(200).json({
            success: true,
            message: "BOM fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateBillOfMaterials = async (req, res) => {
    try {
        const validated = updateBillOfMaterialsSchema.parse(req.body);

        const result = await service.updateBillOfMaterials(
            req.params.id,
            validated
        );

        res.status(200).json({
            success: true,
            message: "BOM updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteBillOfMaterials = async (req, res) => {
    try {
        await service.deleteBillOfMaterials(req.params.id);

        res.status(200).json({
            success: true,
            message: "BOM deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBillOfMaterials,
    getAllBillOfMaterials,
    getBillOfMaterialsById,
    updateBillOfMaterials,
    deleteBillOfMaterials,
};
