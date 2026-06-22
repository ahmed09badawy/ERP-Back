const Trip = require("./trip.model");
const Vehicle = require("../vehicles/vehicle.model");
const Driver = require("../drivers/driver.model");
const Counter = require("../../assets/counter.model");

const generateTripCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "trip" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `TRP-${String(counter.seq).padStart(4, "0")}`;
};

const createTrip = async (payload) => {
    const vehicle = await Vehicle.findById(payload.vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");

    const driver = await Driver.findById(payload.driverId);
    if (!driver) throw new Error("Driver not found");

    const activeTrip = await Trip.findOne({
        vehicleId: payload.vehicleId,
        status: "Ongoing",
    });

    if (activeTrip) {
        throw new Error("Vehicle already in ongoing trip");
    }

    const tripCode = await generateTripCode();

    const trip = await Trip.create({
        ...payload,
        tripCode,
    });

    // ✅ update driver status
    await Driver.findByIdAndUpdate(payload.driverId, {
        status: "On Trip",
    });

    return trip;
};

const getAllTrips = async (query) => {
    const { search, status } = query;

    const filter = {};

    if (status && status !== "all_statuses") {
        filter.status = status;
    }

    const trips = await Trip.find(filter)
        .populate("vehicleId")
        .populate("driverId")
        .sort({ createdAt: -1 });

    return trips;
};

const getTripById = async (id) => {
    const trip = await Trip.findById(id)
        .populate("vehicleId")
        .populate("driverId");

    if (!trip) throw new Error("Trip not found");

    return trip;
};

const updateTrip = async (id, payload) => {
    const trip = await Trip.findById(id);
    if (!trip) throw new Error("Trip not found");

    const updated = await Trip.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    // 🔥 لو الرحلة خلصت
    if (payload.status === "Completed") {
        await Driver.findByIdAndUpdate(trip.driverId, {
            status: "Active",
        });

        // update mileage
        if (payload.distance) {
            await Vehicle.findByIdAndUpdate(trip.vehicleId, {
                $inc: { mileage: payload.distance },
            });
        }
    }

    return updated;
};

const deleteTrip = async (id) => {
    const trip = await Trip.findByIdAndDelete(id);

    if (!trip) throw new Error("Trip not found");

    return trip;
};

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip,
};
