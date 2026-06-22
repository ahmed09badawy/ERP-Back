const ExchangeRate = require("./exchangeRate.model");

const createRate = async (payload) => {
    return ExchangeRate.create(payload);
};

const getRates = async () => {
    return ExchangeRate.find()
        .populate("fromCurrency toCurrency")
        .sort({ createdAt: -1 });
};

module.exports = {
    createRate,
    getRates,
};
