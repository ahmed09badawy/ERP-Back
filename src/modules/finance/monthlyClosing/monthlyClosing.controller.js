const service = require("./monthlyClosing.service");

const closeMonth = async (req, res) => {
    const result = await service.closeMonth(req.body);
    res.status(201).json({ success: true, data: result });
};

const reopenMonth = async (req, res) => {
    const result = await service.reopenMonth(req.body);
    res.status(200).json({ success: true, ...result });
};

const getAllClosings = async (req, res) => {
    const result = await service.getAllClosings();
    res.status(200).json({ success: true, data: result });
};

module.exports = {
    closeMonth,
    reopenMonth,
    getAllClosings,
};
