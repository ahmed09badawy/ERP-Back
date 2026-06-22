const Accident = require("./accident.model");
const Vehicle = require("../vehicles/vehicle.model");
const Driver = require("../drivers/driver.model");
const Counter = require("../../assets/counter.model");

const generateAccidentCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "accident" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `ACC-${String(counter.seq).padStart(4, "0")}`;
};

const createAccident = async (payload) => {
    const vehicle = await Vehicle.findById(payload.vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");

    const driver = await Driver.findById(payload.driverId);
    if (!driver) throw new Error("Driver not found");

    const accidentCode = await generateAccidentCode();

    const accident = await Accident.create({
        ...payload,
        accidentCode,
    });

    if (payload.damageLevel === "Severe" || payload.damageLevel === "High") {
        await Vehicle.findByIdAndUpdate(payload.vehicleId, {
            status: "In Maintenance",
        });
    }

    return accident;
};

const getAllAccidents = async (query) => {
    const { search, status } = query;

    const filter = {};

    if (status && status !== "all_statuses") {
        filter.status = status;
    }

    if (search) {
        filter.$or = [
            { location: { $regex: search, $options: "i" } },
            { insuranceProvider: { $regex: search, $options: "i" } },
        ];
    }

    return await Accident.find(filter)
        .populate("vehicleId")
        .populate("driverId")
        .sort({ createdAt: -1 });
};

const getAccidentById = async (id) => {
    const accident = await Accident.findById(id)
        .populate("vehicleId")
        .populate("driverId");

    if (!accident) throw new Error("Accident not found");

    return accident;
};

const updateAccident = async (id, payload) => {
    const accident = await Accident.findById(id);
    if (!accident) throw new Error("Accident not found");

    const updated = await Accident.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

 
    if (payload.status === "Resolved" || payload.status === "Closed") {
        await Vehicle.findByIdAndUpdate(accident.vehicleId, {
            status: "Active",
        });
    }

    return updated;
};

const deleteAccident = async (id) => {
    const accident = await Accident.findByIdAndDelete(id);

    if (!accident) throw new Error("Accident not found");

    return accident;
};

module.exports = {
    createAccident,
    getAllAccidents,
    getAccidentById,
    updateAccident,
    deleteAccident,
};
