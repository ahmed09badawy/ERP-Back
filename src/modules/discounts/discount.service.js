const Discount = require("./discount.model");
const generateCode = require("../../common/utils/generate-code");

const createDiscount = async (payload) => {
    const discountCode = await generateCode("discount", "DISC");

    return Discount.create({
        ...payload,
        discountCode,
    });
};

const getDiscounts = async () => {
    return Discount.find()
        .populate("productId customerId")
        .sort({ createdAt: -1 });
};

const applyDiscount = async ({ productId, customerId, orderTotal, lineTotal }) => {
    const now = new Date();

    const discounts = await Discount.find({
        status: "ACTIVE",
        $or: [
            { startDate: null },
            { startDate: { $lte: now } },
        ],
        $or: [
            { endDate: null },
            { endDate: { $gte: now } },
        ],
    });

    let appliedDiscount = 0;

    for (const discount of discounts) {
        let matched = false;

        if (discount.appliesTo === "PRODUCT" && discount.productId?.toString() === productId?.toString()) {
            matched = true;
        }

        if (discount.appliesTo === "CUSTOMER" && discount.customerId?.toString() === customerId?.toString()) {
            matched = true;
        }

        if (discount.appliesTo === "ORDER_TOTAL" && orderTotal >= discount.minOrderTotal) {
            matched = true;
        }

        if (!matched) continue;

        if (discount.type === "PERCENTAGE") {
            appliedDiscount += (lineTotal * discount.value) / 100;
        } else if (discount.type === "FIXED") {
            appliedDiscount += discount.value;
        }
    }

    return appliedDiscount;
};

const getDiscountById = async (id) => {
    const discount = await Discount.findById(id).populate("productId customerId");
    if (!discount) {
        const error = new Error("Discount not found");
        error.statusCode = 404;
        throw error;
    }
    return discount;
};

const updateDiscount = async (id, payload) => {
    const discount = await Discount.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    }).populate("productId customerId");

    if (!discount) {
        const error = new Error("Discount not found");
        error.statusCode = 404;
        throw error;
    }
    return discount;
};

const deleteDiscount = async (id) => {
    const discount = await Discount.findByIdAndDelete(id);
    if (!discount) {
        const error = new Error("Discount not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Discount deleted successfully" };
};

module.exports = {
    createDiscount,
    getDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount,
    applyDiscount,
};
