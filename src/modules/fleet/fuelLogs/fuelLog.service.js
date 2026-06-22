const FuelLog = require("./fuelLog.model");
const Vehicle = require("../vehicles/vehicle.model");
const Driver = require("../drivers/driver.model");
const Counter = require("../../assets/counter.model");

const generateFuelCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "fuel" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `FUEL-${String(counter.seq).padStart(4, "0")}`;
};

const createFuelLog = async (payload) => {
    const vehicle = await Vehicle.findById(payload.vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");

    const driver = await Driver.findById(payload.driverId);
    if (!driver) throw new Error("Driver not found");

    const fuelCode = await generateFuelCode();

    const log = await FuelLog.create({
        ...payload,
        fuelCode,
    });

    // 🔥 update mileage من العداد (odometer)
    await Vehicle.findByIdAndUpdate(payload.vehicleId, {
        mileage: payload.odometer,
    });

    return log;
};

const getAllFuelLogs = async (query) => {
    const { search } = query;

    const filter = {};

    if (search) {
        filter.station = { $regex: search, $options: "i" };
    }

    return await FuelLog.find(filter)
        .populate("vehicleId")
        .populate("driverId")
        .sort({ createdAt: -1 });
};

const getFuelLogById = async (id) => {
    const log = await FuelLog.findById(id)
        .populate("vehicleId")
        .populate("driverId");

    if (!log) throw new Error("Fuel log not found");

    return log;
};

const updateFuelLog = async (id, payload) => {
    const log = await FuelLog.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!log) throw new Error("Fuel log not found");

    return log;
};

const deleteFuelLog = async (id) => {
    const log = await FuelLog.findByIdAndDelete(id);

    if (!log) throw new Error("Fuel log not found");

    return log;
};

module.exports = {
    createFuelLog,
    getAllFuelLogs,
    getFuelLogById,
    updateFuelLog,
    deleteFuelLog,
};
