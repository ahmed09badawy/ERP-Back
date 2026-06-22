const Tracking = require("./tracking.model");
const Counter = require("../counter.model"); 
const generateCode = require("../../../common/utils/generate-code")

const createTracking = async (data) => {
    const trackingCode = await generateCode("tracking", "TRA");
    const tracking = await Tracking.create({
        ...data,
        trackingCode,
    });

    return tracking;
};

const getAllTrackings = async (filters) => {
    const query = {};

    if (filters.assetId) {
        query.assetId = filters.assetId;
    }

    const trackings = await Tracking.find(query)
        .populate("assetId", "assetCode assetName serialNumber category location")
        .sort({ createdAt: -1 });

    return trackings;
};

const getTrackingById = async (id) => {
    const tracking = await Tracking.findById(id).populate(
        "assetId",
        "assetCode assetName serialNumber category location"
    );

    return tracking;
};

const updateTracking = async (id, data) => {
    const tracking = await Tracking.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    }).populate("assetId", "assetCode assetName serialNumber category location");

    return tracking;
};

const deleteTracking = async (id) => {
    const tracking = await Tracking.findByIdAndDelete(id);
    return tracking;
};

module.exports = {
    createTracking,
    getAllTrackings,
    getTrackingById,
    updateTracking,
    deleteTracking,
};
