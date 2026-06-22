const service = require("./trip.service");
const {
    createTripSchema,
    updateTripSchema,
} = require("./trip.validation");

const createTrip = async (req, res) => {
    const validated = createTripSchema.parse(req.body);

    const result = await service.createTrip(validated);

    res.status(201).json({
        success: true,
        message: "Trip created successfully",
        data: result,
    });
};

const getAllTrips = async (req, res) => {
    const result = await service.getAllTrips(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getTripById = async (req, res) => {
    const result = await service.getTripById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateTrip = async (req, res) => {
    const validated = updateTripSchema.parse(req.body);

    const result = await service.updateTrip(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Trip updated successfully",
        data: result,
    });
};

const deleteTrip = async (req, res) => {
    const result = await service.deleteTrip(req.params.id);

    res.status(200).json({
        success: true,
        message: "Trip deleted successfully",
    });
};

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip,
};
