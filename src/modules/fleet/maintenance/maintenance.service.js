const Maintenance = require("./maintenance.model");
const Vehicle = require("../vehicles/vehicle.model");
const Counter = require("../../assets/counter.model");

const generateMaintenanceCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "fleetMaintenance" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `MNT-${String(counter.seq).padStart(4, "0")}`;
};

const createMaintenance = async (payload) => {
    const vehicle = await Vehicle.findById(payload.vehicleId);

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    if (payload.odometer < vehicle.mileage) {
        throw new Error("Odometer cannot be less than current vehicle mileage");
    }

    const maintenanceCode = await generateMaintenanceCode();

    const maintenance = await Maintenance.create({
        ...payload,
        maintenanceCode,
    });

    if (payload.status === "Scheduled" || payload.status === "Pending") {
        await Vehicle.findByIdAndUpdate(payload.vehicleId, {
            status: "In Maintenance",
        });
    }

    if (payload.status === "Completed") {
        await Vehicle.findByIdAndUpdate(payload.vehicleId, {
            status: "Active",
            mileage: payload.odometer,
        });
    }

    return maintenance;
};

const getAllMaintenance = async (query) => {
    const { search, status } = query;

    const filter = {};

    if (status && status !== "all_statuses") {
        filter.status = status;
    }

    if (search) {
        filter.$or = [
            { type: { $regex: search, $options: "i" } },
            { provider: { $regex: search, $options: "i" } },
        ];
    }

    return await Maintenance.find(filter)
        .populate("vehicleId")
        .sort({ createdAt: -1 });
};

const getMaintenanceById = async (id) => {
    const maintenance = await Maintenance.findById(id).populate("vehicleId");

    if (!maintenance) {
        throw new Error("Maintenance record not found");
    }

    return maintenance;
};

const updateMaintenance = async (id, payload) => {
    const oldMaintenance = await Maintenance.findById(id);

    if (!oldMaintenance) {
        throw new Error("Maintenance record not found");
    }

    const vehicleId = payload.vehicleId || oldMaintenance.vehicleId;
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    if (payload.odometer && payload.odometer < vehicle.mileage) {
        throw new Error("Odometer cannot be less than current vehicle mileage");
    }

    const updated = await Maintenance.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    if (payload.status === "Scheduled" || payload.status === "Pending") {
        await Vehicle.findByIdAndUpdate(vehicleId, {
            status: "In Maintenance",
        });
    }

    if (payload.status === "Completed") {
        await Vehicle.findByIdAndUpdate(vehicleId, {
            status: "Active",
            mileage: payload.odometer || vehicle.mileage,
        });
    }

    return updated;
};

const deleteMaintenance = async (id) => {
    const maintenance = await Maintenance.findByIdAndDelete(id);

    if (!maintenance) {
        throw new Error("Maintenance record not found");
    }

    return maintenance;
};

module.exports = {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance,
};
