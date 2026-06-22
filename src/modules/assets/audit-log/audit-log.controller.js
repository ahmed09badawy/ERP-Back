const auditLogService = require("./audit-log.service");
const {
    createAuditLogSchema,
    updateAuditLogSchema,
} = require("./audit-log.validation");

const createAuditLog = async (req, res) => {
    try {
        const validatedData = createAuditLogSchema.parse(req.body);

        const auditLog = await auditLogService.createAuditLog(validatedData);

        return res.status(201).json({
            success: true,
            message: "Audit log created successfully",
            data: auditLog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllAuditLogs = async (req, res) => {
    try {
        const filters = {
            assetId: req.query.assetId,
            actionType: req.query.actionType,
        };

        const auditLogs = await auditLogService.getAllAuditLogs(filters);

        return res.status(200).json({
            success: true,
            data: auditLogs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAuditLogById = async (req, res) => {
    try {
        const { id } = req.params;

        const auditLog = await auditLogService.getAuditLogById(id);

        if (!auditLog) {
            return res.status(404).json({
                success: false,
                message: "Audit log not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: auditLog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateAuditLog = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = updateAuditLogSchema.parse(req.body);

        const auditLog = await auditLogService.updateAuditLog(id, validatedData);

        if (!auditLog) {
            return res.status(404).json({
                success: false,
                message: "Audit log not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Audit log updated successfully",
            data: auditLog,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteAuditLog = async (req, res) => {
    try {
        const { id } = req.params;

        const auditLog = await auditLogService.deleteAuditLog(id);

        if (!auditLog) {
            return res.status(404).json({
                success: false,
                message: "Audit log not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Audit log deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createAuditLog,
    getAllAuditLogs,
    getAuditLogById,
    updateAuditLog,
    deleteAuditLog,
};
