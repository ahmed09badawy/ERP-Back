const trackingService = require("./tracking.service");
const {
    createTrackingSchema,
    updateTrackingSchema,
} = require("./tracking.validation");

const createTracking = async (req, res) => {
    try {
        const validatedData = createTrackingSchema.parse(req.body);

        const tracking = await trackingService.createTracking(validatedData);

        return res.status(201).json({
            success: true,
            message: "Tracking created successfully",
            data: tracking,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllTrackings = async (req, res) => {
    try {
        const filters = {
            assetId: req.query.assetId,
        };

        const trackings = await trackingService.getAllTrackings(filters);

        return res.status(200).json({
            success: true,
            data: trackings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getTrackingById = async (req, res) => {
    try {
        const { id } = req.params;

        const tracking = await trackingService.getTrackingById(id);

        if (!tracking) {
            return res.status(404).json({
                success: false,
                message: "Tracking not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: tracking,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateTracking = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = updateTrackingSchema.parse(req.body);

        const tracking = await trackingService.updateTracking(id, validatedData);

        if (!tracking) {
            return res.status(404).json({
                success: false,
                message: "Tracking not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tracking updated successfully",
            data: tracking,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteTracking = async (req, res) => {
    try {
        const { id } = req.params;

        const tracking = await trackingService.deleteTracking(id);

        if (!tracking) {
            return res.status(404).json({
                success: false,
                message: "Tracking not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tracking deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createTracking,
    getAllTrackings,
    getTrackingById,
    updateTracking,
    deleteTracking,
};
