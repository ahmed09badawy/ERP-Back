const PricingRule = require("./pricingRules.model");

const createPricingRule = async (payload) => {
    return PricingRule.create(payload);
};

const getPricingRules = async () => {
    return PricingRule.find().sort({ createdAt: -1 });
};

const applyPricingRule = async ({ productId, customerId, quantity, basePrice }) => {
    const now = new Date();

    const rules = await PricingRule.find({
        status: "ACTIVE",
        minQty: { $lte: quantity },
        $or: [
            { productId: productId },
            { customerId: customerId },
        ],
        $or: [
            { startDate: null },
            { startDate: { $lte: now } },
        ],
        $or: [
            { endDate: null },
            { endDate: { $gte: now } },
        ],
    });

    if (!rules.length) return basePrice;

    const rule = rules[0];

    if (rule.priceType === "FIXED") {
        return rule.value;
    }

    if (rule.priceType === "PERCENTAGE") {
        return basePrice - (basePrice * rule.value) / 100;
    }

    return basePrice;
};

const getPricingRuleById = async (id) => {
    const rule = await PricingRule.findById(id);
    if (!rule) {
        const error = new Error("Pricing rule not found");
        error.statusCode = 404;
        throw error;
    }
    return rule;
};

const updatePricingRule = async (id, payload) => {
    const rule = await PricingRule.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!rule) {
        const error = new Error("Pricing rule not found");
        error.statusCode = 404;
        throw error;
    }
    return rule;
};

const deletePricingRule = async (id) => {
    const rule = await PricingRule.findByIdAndDelete(id);
    if (!rule) {
        const error = new Error("Pricing rule not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Pricing rule deleted successfully" };
};

module.exports = {
    createPricingRule,
    getPricingRules,
    getPricingRuleById,
    updatePricingRule,
    deletePricingRule,
    applyPricingRule,
};
