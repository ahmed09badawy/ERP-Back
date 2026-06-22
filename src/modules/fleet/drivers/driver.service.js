const Driver = require("./driver.model");
const Vehicle = require("../vehicles/vehicle.model");
const Counter = require("../../assets/counter.model");

const generateDriverCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "driver" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `DRV-${String(counter.seq).padStart(4, "0")}`;
};

const createDriver = async (payload) => {
    const exists = await Driver.findOne({
        licenseNumber: payload.licenseNumber,
    });

    if (exists) {
        throw new Error("License number already exists");
    }

    if (payload.assignedVehicleId) {
        const vehicle = await Vehicle.findById(payload.assignedVehicleId);
        if (!vehicle) throw new Error("Vehicle not found");
    }

    const driverCode = await generateDriverCode();

    const driver = await Driver.create({
        ...payload,
        driverCode,
        code: driverCode,
    });

    return driver;
};

const getAllDrivers = async (query) => {
    const { search, status } = query;

    const filter = {};

    if (search) {
        filter.$or = [
            { driverName: { $regex: search, $options: "i" } },
            { licenseNumber: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
        ];
    }

    if (status && status !== "all_statuses") {
        filter.status = status;
    }

    return await Driver.find(filter)
        .populate("assignedVehicleId")
        .sort({ createdAt: -1 });
};

const getDriverById = async (id) => {
    const driver = await Driver.findById(id).populate("assignedVehicleId");

    if (!driver) throw new Error("Driver not found");

    return driver;
};

const updateDriver = async (id, payload) => {
    if (payload.licenseNumber) {
        const exists = await Driver.findOne({
            licenseNumber: payload.licenseNumber,
            _id: { $ne: id },
        });

        if (exists) throw new Error("License number already exists");
    }

    if (payload.assignedVehicleId) {
        const vehicle = await Vehicle.findById(payload.assignedVehicleId);
        if (!vehicle) throw new Error("Vehicle not found");
    }

    const driver = await Driver.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!driver) throw new Error("Driver not found");

    return driver;
};

const deleteDriver = async (id) => {
    const driver = await Driver.findByIdAndDelete(id);

    if (!driver) throw new Error("Driver not found");

    return driver;
};

module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
};
