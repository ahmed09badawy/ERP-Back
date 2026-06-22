const service = require("./exchangeRate.service");

const createRate = async (req, res) => {
    const result = await service.createRate(req.body);
    res.status(201).json({ success: true, data: result });
};

const getRates = async (req, res) => {
    const result = await service.getRates();
    res.json({ success: true, data: result });
};

module.exports = {
    createRate,
    getRates,
};
