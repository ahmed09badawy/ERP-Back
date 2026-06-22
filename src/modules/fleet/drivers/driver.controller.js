const service = require("./driver.service");
const {
    createDriverSchema,
    updateDriverSchema,
} = require("./driver.validation");

const createDriver = async (req, res) => {
    const validated = createDriverSchema.parse(req.body);

    const result = await service.createDriver(validated);

    res.status(201).json({
        success: true,
        message: "Driver created successfully",
        data: result,
    });
};

const getAllDrivers = async (req, res) => {
    const result = await service.getAllDrivers(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getDriverById = async (req, res) => {
    const result = await service.getDriverById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateDriver = async (req, res) => {
    const validated = updateDriverSchema.parse(req.body);

    const result = await service.updateDriver(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Driver updated successfully",
        data: result,
    });
};

const deleteDriver = async (req, res) => {
    const result = await service.deleteDriver(req.params.id);

    res.status(200).json({
        success: true,
        message: "Driver deleted successfully",
    });
};

module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
};
