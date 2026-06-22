const service = require("./tax.service");
const { createTaxSchema, updateTaxSchema } = require("./tax.validation");

const createTax = async (req, res) => {
    const validated = createTaxSchema.parse(req.body);
    const result = await service.createTax(validated);

    res.status(201).json({
        success: true,
        data: result,
    });
};

const getAllTaxes = async (req, res) => {
    const result = await service.getAllTaxes();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getTaxById = async (req, res) => {
    const result = await service.getTaxById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateTax = async (req, res) => {
    const validated = updateTaxSchema.parse(req.body);
    const result = await service.updateTax(req.params.id, validated);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const deleteTax = async (req, res) => {
    const result = await service.deleteTax(req.params.id);

    res.status(200).json({
        success: true,
        ...result,
    });
};

module.exports = {
    createTax,
    getAllTaxes,
    getTaxById,
    updateTax,
    deleteTax,
};
