const Vehicle = require("./vehicle.model");
const Counter = require("../../assets/counter.model");

const generateVehicleCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "vehicle" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `VEH-${String(counter.seq).padStart(4, "0")}`;
};

const createVehicle = async (payload) => {
    const exists = await Vehicle.findOne({
        plateNumber: payload.plateNumber.toUpperCase(),
    });

    if (exists) {
        throw new Error("Plate number already exists");
    }

    const vehicleCode = await generateVehicleCode();

    const vehicle = await Vehicle.create({
        ...payload,
        vehicleCode,
        code: vehicleCode,
    });

    return vehicle;
};

const getAllVehicles = async (query) => {
    const { search, status } = query;

    const filter = {};

    if (search) {
        filter.$or = [
            { plateNumber: { $regex: search, $options: "i" } },
            { model: { $regex: search, $options: "i" } },
            { type: { $regex: search, $options: "i" } },
            { fuelType: { $regex: search, $options: "i" } },
        ];
    }

    if (status && status !== "all_statuses") {
        filter.status = status;
    }

    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });

    return vehicles;
};

const getVehicleById = async (id) => {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    return vehicle;
};

const updateVehicle = async (id, payload) => {
    if (payload.plateNumber) {
        const exists = await Vehicle.findOne({
            plateNumber: payload.plateNumber.toUpperCase(),
            _id: { $ne: id },
        });

        if (exists) {
            throw new Error("Plate number already exists");
        }
    }

    const vehicle = await Vehicle.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    return vehicle;
};

const deleteVehicle = async (id) => {
    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    return vehicle;
};

module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
};
