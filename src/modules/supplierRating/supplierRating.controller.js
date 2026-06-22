const supplierRatingService = require("./supplierRating.service");
const {
    createSupplierRatingSchema,
    updateSupplierRatingSchema,
} = require("./supplierRating.validation");

const createSupplierRating = async (req, res) => {
    const validatedData = createSupplierRatingSchema.parse(req.body);
    const rating = await supplierRatingService.createSupplierRating(validatedData);

    res.status(201).json({
        success: true,
        message: "Supplier rating created successfully",
        data: rating,
    });
};

const getSupplierRatings = async (req, res) => {
    const ratings = await supplierRatingService.getSupplierRatings(req.query);

    res.status(200).json({
        success: true,
        count: ratings.length,
        data: ratings,
    });
};

const getSupplierRatingById = async (req, res) => {
    const rating = await supplierRatingService.getSupplierRatingById(req.params.id);

    res.status(200).json({
        success: true,
        data: rating,
    });
};

const updateSupplierRating = async (req, res) => {
    const validatedData = updateSupplierRatingSchema.parse(req.body);
    const rating = await supplierRatingService.updateSupplierRating(
        req.params.id,
        validatedData
    );

    res.status(200).json({
        success: true,
        message: "Supplier rating updated successfully",
        data: rating,
    });
};

const deleteSupplierRating = async (req, res) => {
    await supplierRatingService.deleteSupplierRating(req.params.id);

    res.status(200).json({
        success: true,
        message: "Supplier rating deleted successfully",
    });
};

module.exports = {
    createSupplierRating,
    getSupplierRatings,
    getSupplierRatingById,
    updateSupplierRating,
    deleteSupplierRating,
};
