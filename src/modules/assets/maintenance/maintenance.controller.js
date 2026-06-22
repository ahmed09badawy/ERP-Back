const maintenanceService = require("./maintenance.service");
const {
    createMaintenanceSchema,
    updateMaintenanceSchema,
} = require("./maintenance.validation");

const createMaintenance = async (req, res) => {
    try {
        const validatedData = createMaintenanceSchema.parse(req.body);

        const maintenance = await maintenanceService.createMaintenance(validatedData);

        return res.status(201).json({
            success: true,
            message: "Maintenance created successfully",
            data: maintenance,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllMaintenances = async (req, res) => {
    try {
        const filters = {
            assetId: req.query.assetId,
            maintenanceType: req.query.maintenanceType,
            state: req.query.state,
            scheduledDate: req.query.scheduledDate,
        };

        const maintenances = await maintenanceService.getAllMaintenances(filters);

        return res.status(200).json({
            success: true,
            data: maintenances,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMaintenanceById = async (req, res) => {
    try {
        const { id } = req.params;

        const maintenance = await maintenanceService.getMaintenanceById(id);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: maintenance,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = updateMaintenanceSchema.parse(req.body);

        const maintenance = await maintenanceService.updateMaintenance(id, validatedData);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Maintenance updated successfully",
            data: maintenance,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteMaintenance = async (req, res) => {
    try {
        const { id } = req.params;

        const maintenance = await maintenanceService.deleteMaintenance(id);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Maintenance deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createMaintenance,
    getAllMaintenances,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance,
};
