const service = require("./vehicle.service");
const {
    createVehicleSchema,
    updateVehicleSchema,
} = require("./vehicle.validation");

const createVehicle = async (req, res) => {
    const validated = createVehicleSchema.parse(req.body);

    const result = await service.createVehicle(validated);

    res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data: result,
    });
};

const getAllVehicles = async (req, res) => {
    const result = await service.getAllVehicles(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getVehicleById = async (req, res) => {
    const result = await service.getVehicleById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateVehicle = async (req, res) => {
    const validated = updateVehicleSchema.parse(req.body);

    const result = await service.updateVehicle(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result,
    });
};

const deleteVehicle = async (req, res) => {
    const result = await service.deleteVehicle(req.params.id);

    res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
    });
};

module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
};
