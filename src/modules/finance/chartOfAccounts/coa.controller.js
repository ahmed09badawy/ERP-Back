const service = require("./coa.service");
const {
    createCoaSchema,
    updateCoaSchema,
} = require("./coa.validation");

const createCoa = async (req, res) => {
    const validated = createCoaSchema.parse(req.body);
    const result = await service.createCoa(validated);

    res.status(201).json({ success: true, data: result });
};

const getAllCoa = async (req, res) => {
    const { accounts, pagination } = await service.getAllCoa(req.query);

    res.status(200).json({ success: true, data: accounts, pagination });
};

const getCoaById = async (req, res) => {
    const result = await service.getCoaById(req.params.id);

    res.status(200).json({ success: true, data: result });
};

const updateCoa = async (req, res) => {
    const validated = updateCoaSchema.parse(req.body);
    const result = await service.updateCoa(req.params.id, validated);

    res.status(200).json({ success: true, data: result });
};

const deleteCoa = async (req, res) => {
    const result = await service.deleteCoa(req.params.id);

    res.status(200).json({ success: true, ...result });
};

module.exports = {
    createCoa,
    getAllCoa,
    getCoaById,
    updateCoa,
    deleteCoa,
};
