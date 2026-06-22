const Promotion = require("./promotion.model");
const generateCode = require("../../common/utils/generate-code");

const createPromotion = async (payload) => {
    const promotionCode = await generateCode("promotion", "PROMO");

    return Promotion.create({
        ...payload,
        promotionCode,
    });
};

const getPromotions = async () => {
    return Promotion.find()
        .populate("productId customerId")
        .sort({ createdAt: -1 });
};

const applyPromotion = async ({
    productId,
    customerId,
    quantity,
    orderTotal,
    promoCode,
    lineTotal,
}) => {
    const now = new Date();

    const promotions = await Promotion.find({
        status: "ACTIVE",
        $and: [
            {
                $or: [
                    { startDate: null },
                    { startDate: { $lte: now } },
                ],
            },
            {
                $or: [
                    { endDate: null },
                    { endDate: { $gte: now } },
                ],
            },
        ],
    });

    let appliedBenefit = 0;

    for (const promo of promotions) {
        let matched = false;

        if (promo.conditionType === "ORDER_TOTAL" && orderTotal >= promo.minOrderTotal) {
            matched = true;
        }

        if (
            promo.conditionType === "PRODUCT_QTY" &&
            promo.productId?.toString() === productId?.toString() &&
            quantity >= promo.minQty
        ) {
            matched = true;
        }

        if (
            promo.conditionType === "CUSTOMER" &&
            promo.customerId?.toString() === customerId?.toString()
        ) {
            matched = true;
        }

        if (
            promo.conditionType === "PROMO_CODE" &&
            promoCode &&
            promo.promoCode === promoCode.toUpperCase()
        ) {
            matched = true;
        }

        if (!matched) continue;

        if (promo.type === "PERCENTAGE") {
            appliedBenefit += (lineTotal * promo.value) / 100;
        } else if (promo.type === "FIXED") {
            appliedBenefit += promo.value;
        } else if (promo.type === "FREE_SHIPPING") {
            appliedBenefit += 0;
        } else if (promo.type === "BUY_X_GET_Y") {
            appliedBenefit += 0;
        }
    }

    return appliedBenefit;
};

const getPromotionById = async (id) => {
    const promotion = await Promotion.findById(id).populate("productId customerId");
    if (!promotion) {
        const error = new Error("Promotion not found");
        error.statusCode = 404;
        throw error;
    }
    return promotion;
};

const updatePromotion = async (id, payload) => {
    delete payload.promotionCode;

    const promotion = await Promotion.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    }).populate("productId customerId");

    if (!promotion) {
        const error = new Error("Promotion not found");
        error.statusCode = 404;
        throw error;
    }
    return promotion;
};

const deletePromotion = async (id) => {
    const promotion = await Promotion.findByIdAndDelete(id);
    if (!promotion) {
        const error = new Error("Promotion not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Promotion deleted successfully" };
};

module.exports = {
    createPromotion,
    getPromotions,
    getPromotionById,
    updatePromotion,
    deletePromotion,
    applyPromotion,
};
