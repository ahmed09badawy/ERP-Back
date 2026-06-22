const AuditLog = require("./audit-log.model");
const Counter = require("../counter.model"); 
const generateCode = require("../../../common/utils/generate-code");

const createAuditLog = async (data) => {
    const auditCode = await generateCode("auditLog" , "AUD")
    const auditLog = await AuditLog.create({
        ...data,
        auditCode,
    });

    return auditLog;
};

const getAllAuditLogs = async (filters) => {
    const query = {};

    if (filters.assetId) {
        query.assetId = filters.assetId;
    }

    if (filters.actionType) {
        query.actionType = filters.actionType;
    }

    const auditLogs = await AuditLog.find(query)
        .populate("assetId", "assetCode assetName serialNumber category location")
        .sort({ createdAt: -1 });

    return auditLogs;
};

const getAuditLogById = async (id) => {
    const auditLog = await AuditLog.findById(id).populate(
        "assetId",
        "assetCode assetName serialNumber category location"
    );

    return auditLog;
};

const updateAuditLog = async (id, data) => {
    const auditLog = await AuditLog.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    }).populate("assetId", "assetCode assetName serialNumber category location");

    return auditLog;
};

const deleteAuditLog = async (id) => {
    const auditLog = await AuditLog.findByIdAndDelete(id);
    return auditLog;
};

module.exports = {
    createAuditLog,
    getAllAuditLogs,
    getAuditLogById,
    updateAuditLog,
    deleteAuditLog,
};
