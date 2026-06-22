const service = require("./accountPayable.service");
const { createAPSchema, updateAPSchema } = require("./accountPayable.validation");

const createAP = async (req, res) => {
    const validated = createAPSchema.parse(req.body);
    const result = await service.createAP(validated);
    res.status(201).json({ success: true, data: result });
};

const getAllAP = async (req, res) => {
    const result = await service.getAllAP();
    res.status(200).json({ success: true, data: result });
};

const getAPById = async (req, res) => {
    const result = await service.getAPById(req.params.id);
    res.status(200).json({ success: true, data: result });
};

const updateAP = async (req, res) => {
    const validated = updateAPSchema.parse(req.body);
    const result = await service.updateAP(req.params.id, validated);
    res.status(200).json({ success: true, data: result });
};

const deleteAP = async (req, res) => {
    const result = await service.deleteAP(req.params.id);
    res.status(200).json({ success: true, ...result });
};

module.exports = {
    createAP,
    getAllAP,
    getAPById,
    updateAP,
    deleteAP,
};
