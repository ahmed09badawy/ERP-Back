const service = require("./currency.service");
const {
    createCurrencySchema,
    updateCurrencySchema,
} = require("./currency.validation");

const createCurrency = async (req, res) => {
    const validated = createCurrencySchema.parse(req.body);
    const result = await service.createCurrency(validated);

    res.status(201).json({ success: true, data: result });
};

const getAllCurrencies = async (req, res) => {
    const result = await service.getAllCurrencies();
    res.status(200).json({ success: true, data: result });
};

const getCurrencyById = async (req, res) => {
    const result = await service.getCurrencyById(req.params.id);
    res.status(200).json({ success: true, data: result });
};

const updateCurrency = async (req, res) => {
    const validated = updateCurrencySchema.parse(req.body);
    const result = await service.updateCurrency(req.params.id, validated);

    res.status(200).json({ success: true, data: result });
};

const deleteCurrency = async (req, res) => {
    const result = await service.deleteCurrency(req.params.id);
    res.status(200).json({ success: true, ...result });
};

module.exports = {
    createCurrency,
    getAllCurrencies,
    getCurrencyById,
    updateCurrency,
    deleteCurrency,
};
