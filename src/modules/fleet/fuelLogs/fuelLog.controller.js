const service = require("./fuelLog.service");
const {
    createFuelLogSchema,
    updateFuelLogSchema,
} = require("./fuelLog.validation");

const createFuelLog = async (req, res) => {
    const validated = createFuelLogSchema.parse(req.body);

    const result = await service.createFuelLog(validated);

    res.status(201).json({
        success: true,
        message: "Fuel log created successfully",
        data: result,
    });
};

const getAllFuelLogs = async (req, res) => {
    const result = await service.getAllFuelLogs(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getFuelLogById = async (req, res) => {
    const result = await service.getFuelLogById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateFuelLog = async (req, res) => {
    const validated = updateFuelLogSchema.parse(req.body);

    const result = await service.updateFuelLog(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Fuel log updated successfully",
        data: result,
    });
};

const deleteFuelLog = async (req, res) => {
    const result = await service.deleteFuelLog(req.params.id);

    res.status(200).json({
        success: true,
        message: "Fuel log deleted successfully",
    });
};

module.exports = {
    createFuelLog,
    getAllFuelLogs,
    getFuelLogById,
    updateFuelLog,
    deleteFuelLog,
};
