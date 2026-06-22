const Booking = require("./booking.model");
const Vehicle = require("../vehicles/vehicle.model");
const Counter = require("../../assets/counter.model");

const generateBookingCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "booking" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `BOK-${String(counter.seq).padStart(4, "0")}`;
};

const createBooking = async (payload) => {
    const vehicle = await Vehicle.findById(payload.vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");

    // ❌ check overlapping bookings
    const conflict = await Booking.findOne({
        vehicleId: payload.vehicleId,
        status: { $in: ["Approved", "Pending"] },
        $or: [
            {
                startDate: { $lte: payload.endDate },
                endDate: { $gte: payload.startDate },
            },
        ],
    });

    if (conflict) {
        throw new Error("Vehicle already booked for this period");
    }

    const bookingCode = await generateBookingCode();

    const booking = await Booking.create({
        ...payload,
        bookingCode,
    });

    return booking;
};

const getAllBookings = async (query) => {
    const { search, status } = query;

    const filter = {};

    if (status && status !== "all_statuses") {
        filter.status = status;
    }

    if (search) {
        filter.requestedBy = { $regex: search, $options: "i" };
    }

    return await Booking.find(filter)
        .populate("vehicleId")
        .sort({ createdAt: -1 });
};

const getBookingById = async (id) => {
    const booking = await Booking.findById(id).populate("vehicleId");

    if (!booking) throw new Error("Booking not found");

    return booking;
};

const updateBooking = async (id, payload) => {
    const booking = await Booking.findById(id);
    if (!booking) throw new Error("Booking not found");

    const updated = await Booking.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    // 🔥 لو Approved → ممكن تحجز العربية
    if (payload.status === "Approved") {
        await Vehicle.findByIdAndUpdate(booking.vehicleId, {
            status: "Inactive",
        });
    }

    // 🔥 لو Completed → العربية ترجع
    if (payload.status === "Completed") {
        await Vehicle.findByIdAndUpdate(booking.vehicleId, {
            status: "Active",
        });
    }

    return updated;
};

const deleteBooking = async (id) => {
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) throw new Error("Booking not found");

    return booking;
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};
