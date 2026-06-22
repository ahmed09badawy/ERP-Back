const service = require("./maintenance.service");
const {
    createMaintenanceSchema,
    updateMaintenanceSchema,
} = require("./maintenance.validation");

const createMaintenance = async (req, res) => {
    const validated = createMaintenanceSchema.parse(req.body);

    const result = await service.createMaintenance(validated);

    res.status(201).json({
        success: true,
        message: "Maintenance record created successfully",
        data: result,
    });
};

const getAllMaintenance = async (req, res) => {
    const result = await service.getAllMaintenance(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getMaintenanceById = async (req, res) => {
    const result = await service.getMaintenanceById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateMaintenance = async (req, res) => {
    const validated = updateMaintenanceSchema.parse(req.body);

    const result = await service.updateMaintenance(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Maintenance record updated successfully",
        data: result,
    });
};

const deleteMaintenance = async (req, res) => {
    const result = await service.deleteMaintenance(req.params.id);

    res.status(200).json({
        success: true,
        message: "Maintenance record deleted successfully",
    });
};

module.exports = {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance,
};
