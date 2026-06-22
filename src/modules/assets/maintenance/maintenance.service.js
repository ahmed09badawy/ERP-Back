const Maintenance = require("./maintenance.model");
const Counter  = require("../counter.model")
const generateCode = require("../../../common/utils/generate-code");
const createMaintenance = async (data) => {
    const maintenanceCode = await generateCode("Maintenance", "MAI");
    const maintenance = await Maintenance.create({
        ...data,
        maintenanceCode,
    });

    return maintenance;
};

const getAllMaintenances = async (filters) => {
    const query = {};

    if (filters.assetId) {
        query.assetId = filters.assetId;
    }

    if (filters.maintenanceType) {
        query.maintenanceType = filters.maintenanceType;
    }

    if (filters.state) {
        query.state = filters.state;
    }

    if (filters.scheduledDate) {
        const startDate = new Date(filters.scheduledDate);
        const endDate = new Date(filters.scheduledDate);
        endDate.setHours(23, 59, 59, 999);

        query.scheduledDate = {
            $gte: startDate,
            $lte: endDate,
        };
    }

    const maintenances = await Maintenance.find(query)
        .populate("assetId", "assetName serialNumber category location")
        .sort({ createdAt: -1 });

    return maintenances;
};

const getMaintenanceById = async (id) => {
    const maintenance = await Maintenance.findById(id).populate(
        "assetId",
        "assetName serialNumber category location"
    );
    return maintenance;
};

const updateMaintenance = async (id, data) => {
    const maintenance = await Maintenance.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    }).populate("assetId", "assetName serialNumber category location");

    return maintenance;
};

const deleteMaintenance = async (id) => {
    const maintenance = await Maintenance.findByIdAndDelete(id);
    return maintenance;
};

module.exports = {
    createMaintenance,
    getAllMaintenances,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance,
};
