const service = require("./contracts.service");
const {
    createContractSchema,
    updateContractSchema,
} = require("./contracts.validation");

const createContract = async (req, res) => {
    const validated = createContractSchema.parse(req.body);
    const result = await service.createContract(validated);

    res.status(201).json({
        success: true,
        message: "Contract created successfully",
        data: result,
    });
};

const getAllContracts = async (req, res) => {
    const result = await service.getAllContracts(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getContractById = async (req, res) => {
    const result = await service.getContractById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateContract = async (req, res) => {
    const validated = updateContractSchema.parse(req.body);
    const result = await service.updateContract(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Contract updated successfully",
        data: result,
    });
};

const deleteContract = async (req, res) => {
    await service.deleteContract(req.params.id);

    res.status(200).json({
        success: true,
        message: "Contract deleted successfully",
    });
};

module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract,
};
