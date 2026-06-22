const Currency = require("./currency.model");

const createCurrency = async (payload) => {
    const exists = await Currency.findOne({ code: payload.code });

    if (exists) {
        const error = new Error("Currency already exists");
        error.statusCode = 400;
        throw error;
    }

 
    if (payload.isBaseCurrency) {
        await Currency.updateMany({}, { isBaseCurrency: false });
    }

    return Currency.create(payload);
};

const getAllCurrencies = async () => {
    return Currency.find({ isActive: true }).sort({ createdAt: -1 });
};

const getCurrencyById = async (id) => {
    const currency = await Currency.findById(id);

    if (!currency || !currency.isActive) {
        const error = new Error("Currency not found");
        error.statusCode = 404;
        throw error;
    }

    return currency;
};

const updateCurrency = async (id, payload) => {
    const currency = await Currency.findById(id);

    if (!currency || !currency.isActive) {
        const error = new Error("Currency not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.code) {
        const exists = await Currency.findOne({
            code: payload.code,
            _id: { $ne: id },
        });

        if (exists) {
            const error = new Error("Currency code already exists");
            error.statusCode = 400;
            throw error;
        }
    }

    if (payload.isBaseCurrency) {
        await Currency.updateMany({}, { isBaseCurrency: false });
    }

    Object.assign(currency, payload);
    await currency.save();

    return currency;
};

const deleteCurrency = async (id) => {
    const currency = await Currency.findById(id);

    if (!currency || !currency.isActive) {
        const error = new Error("Currency not found");
        error.statusCode = 404;
        throw error;
    }

    currency.isActive = false;
    await currency.save();

    return { message: "Currency deleted successfully" };
};

module.exports = {
    createCurrency,
    getAllCurrencies,
    getCurrencyById,
    updateCurrency,
    deleteCurrency,
};
