const service = require("./pricelist.service");
const { createPricelistSchema, updatePricelistSchema } = require("./pricelist.validation");

const createPricelist = async (req, res) => {
    const validated = createPricelistSchema.parse(req.body);
    const result = await service.createPricelist(validated);
    res.status(201).json({ success: true, data: result });
};

const getAllPricelists = async (req, res) => {
    const result = await service.getAllPricelists(req.query);
    res.status(200).json({ success: true, data: result });
};

const getPricelistById = async (req, res) => {
    const result = await service.getPricelistById(req.params.id);
    res.status(200).json({ success: true, data: result });
};

const updatePricelist = async (req, res) => {
    const validated = updatePricelistSchema.parse(req.body);
    const result = await service.updatePricelist(req.params.id, validated);
    res.status(200).json({ success: true, data: result });
};

const deletePricelist = async (req, res) => {
    const result = await service.deletePricelist(req.params.id);
    res.status(200).json({ success: true, ...result });
};

module.exports = {
    createPricelist,
    getAllPricelists,
    getPricelistById,
    updatePricelist,
    deletePricelist,
};
