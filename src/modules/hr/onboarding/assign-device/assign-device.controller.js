const service = require("./assign-device.service");
const {
    createAssignDeviceSchema,
    updateAssignDeviceSchema,
} = require("./assign-device.validation");

const createAssignDevice = async (req, res) => {
    const validated = createAssignDeviceSchema.parse(req.body);
    const result = await service.createAssignDevice(validated);

    res.status(201).json({
        success: true,
        message: "Device assigned successfully",
        data: result,
    });
};

const getAllAssignDevices = async (req, res) => {
    const result = await service.getAllAssignDevices(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getAssignDeviceById = async (req, res) => {
    const result = await service.getAssignDeviceById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateAssignDevice = async (req, res) => {
    const validated = updateAssignDeviceSchema.parse(req.body);
    const result = await service.updateAssignDevice(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Device updated successfully",
        data: result,
    });
};

const deleteAssignDevice = async (req, res) => {
    await service.deleteAssignDevice(req.params.id);

    res.status(200).json({
        success: true,
        message: "Device deleted successfully",
    });
};

module.exports = {
    createAssignDevice,
    getAllAssignDevices,
    getAssignDeviceById,
    updateAssignDevice,
    deleteAssignDevice,
};
