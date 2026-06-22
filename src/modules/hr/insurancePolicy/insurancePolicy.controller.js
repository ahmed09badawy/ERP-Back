const service = require("./insurancePolicy.service");
const {
    createInsurancePolicySchema,
    updateInsurancePolicySchema,
} = require("./insurancePolicy.validation");

const createInsurancePolicy = async (req, res) => {
    const validated = createInsurancePolicySchema.parse(req.body);
    const result = await service.createInsurancePolicy(validated);

    res.status(201).json({
        success: true,
        message: "Insurance policy created successfully",
        data: result,
    });
};

const getAllInsurancePolicies = async (req, res) => {
    const result = await service.getAllInsurancePolicies(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getInsurancePolicyById = async (req, res) => {
    const result = await service.getInsurancePolicyById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateInsurancePolicy = async (req, res) => {
    const validated = updateInsurancePolicySchema.parse(req.body);
    const result = await service.updateInsurancePolicy(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Insurance policy updated successfully",
        data: result,
    });
};

const deleteInsurancePolicy = async (req, res) => {
    await service.deleteInsurancePolicy(req.params.id);

    res.status(200).json({
        success: true,
        message: "Insurance policy deleted successfully",
    });
};

module.exports = {
    createInsurancePolicy,
    getAllInsurancePolicies,
    getInsurancePolicyById,
    updateInsurancePolicy,
    deleteInsurancePolicy,
};
