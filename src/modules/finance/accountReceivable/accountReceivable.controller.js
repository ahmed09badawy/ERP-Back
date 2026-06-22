const service = require("./accountReceivable.service");
const { createARSchema, updateARSchema } = require("./accountReceivable.validation");

const createAR = async (req, res) => {
    const validated = createARSchema.parse(req.body);
    const result = await service.createAR(validated);
    res.status(201).json({ success: true, data: result });
};

const getAllAR = async (req, res) => {
    const { invoices, pagination } = await service.getAllAR(req.query);
    res.status(200).json({ success: true, data: invoices, pagination });
};

const getARById = async (req, res) => {
    const result = await service.getARById(req.params.id);
    res.status(200).json({ success: true, data: result });
};

const updateAR = async (req, res) => {
    const validated = updateARSchema.parse(req.body);
    const result = await service.updateAR(req.params.id, validated);
    res.status(200).json({ success: true, data: result });
};

const deleteAR = async (req, res) => {
    const result = await service.deleteAR(req.params.id);
    res.status(200).json({ success: true, ...result });
};

module.exports = {
    createAR,
    getAllAR,
    getARById,
    updateAR,
    deleteAR,
};
