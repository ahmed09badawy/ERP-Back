const service = require("./booking.service");
const {
    createBookingSchema,
    updateBookingSchema,
} = require("./booking.validation");

const createBooking = async (req, res) => {
    const validated = createBookingSchema.parse(req.body);

    const result = await service.createBooking(validated);

    res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: result,
    });
};

const getAllBookings = async (req, res) => {
    const result = await service.getAllBookings(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getBookingById = async (req, res) => {
    const result = await service.getBookingById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateBooking = async (req, res) => {
    const validated = updateBookingSchema.parse(req.body);

    const result = await service.updateBooking(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data: result,
    });
};

const deleteBooking = async (req, res) => {
    const result = await service.deleteBooking(req.params.id);

    res.status(200).json({
        success: true,
        message: "Booking deleted successfully",
    });
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};
