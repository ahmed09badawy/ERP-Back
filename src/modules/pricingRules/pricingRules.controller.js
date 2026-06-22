const service = require("./pricingRules.service");
const { createPricingRuleSchema, updatePricingRuleSchema } = require("./pricingRules.validation");

const createPricingRule = async (req, res) => {
    const data = createPricingRuleSchema.parse(req.body);
    const result = await service.createPricingRule(data);

    res.status(201).json({
        success: true,
        message: "Pricing rule created successfully",
        data: result,
    });
};

const getPricingRules = async (req, res) => {
    const result = await service.getPricingRules();

    res.status(200).json({
        success: true,
        message: "Pricing rules retrieved successfully",
        data: result,
    });
};

const getPricingRuleById = async (req, res) => {
    const result = await service.getPricingRuleById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Pricing rule details retrieved successfully",
        data: result,
    });
};

const updatePricingRule = async (req, res) => {
    const validatedData = updatePricingRuleSchema.parse(req.body);
    const result = await service.updatePricingRule(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Pricing rule updated successfully",
        data: result,
    });
};

const deletePricingRule = async (req, res) => {
    await service.deletePricingRule(req.params.id);

    res.status(200).json({
        success: true,
        message: "Pricing rule deleted successfully",
    });
};

module.exports = {
    createPricingRule,
    getPricingRules,
    getPricingRuleById,
    updatePricingRule,
    deletePricingRule,
};
