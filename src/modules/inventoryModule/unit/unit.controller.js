const unitService = require("./unit.service");
const {
    createUnitSchema,
    updateUnitSchema,
} = require("./unit.validation");

const createUnit = async (req, res) => {
    const validatedData = createUnitSchema.parse(req.body);
    const unit = await unitService.createUnit(validatedData);

    res.status(201).json({
        success: true,
        message: "Unit created successfully",
        data: unit,
    });
};

const getUnits = async (req, res) => {
    const units = await unitService.getUnits(req.query);

    res.status(200).json({
        success: true,
        count: units.length,
        data: units,
    });
};

const getUnitById = async (req, res) => {
    const unit = await unitService.getUnitById(req.params.id);

    res.status(200).json({
        success: true,
        data: unit,
    });
};

const updateUnit = async (req, res) => {
    const validatedData = updateUnitSchema.parse(req.body);
    const unit = await unitService.updateUnit(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Unit updated successfully",
        data: unit,
    });
};

const deleteUnit = async (req, res) => {
    await unitService.deleteUnit(req.params.id);

    res.status(200).json({
        success: true,
        message: "Unit deleted successfully",
    });
};

module.exports = {
    createUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit,
};
