const service = require("./accident.service");
const {
    createAccidentSchema,
    updateAccidentSchema,
} = require("./accident.validation");

const createAccident = async (req, res) => {
    const validated = createAccidentSchema.parse(req.body);

    const result = await service.createAccident(validated);

    res.status(201).json({
        success: true,
        message: "Accident created successfully",
        data: result,
    });
};

const getAllAccidents = async (req, res) => {
    const result = await service.getAllAccidents(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getAccidentById = async (req, res) => {
    const result = await service.getAccidentById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateAccident = async (req, res) => {
    const validated = updateAccidentSchema.parse(req.body);

    const result = await service.updateAccident(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Accident updated successfully",
        data: result,
    });
};

const deleteAccident = async (req, res) => {
    const result = await service.deleteAccident(req.params.id);

    res.status(200).json({
        success: true,
        message: "Accident deleted successfully",
        data: result,
    });
};

module.exports = {
    createAccident,
    getAllAccidents,
    getAccidentById,
    updateAccident,
    deleteAccident,
};
