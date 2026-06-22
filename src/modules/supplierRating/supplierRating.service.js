const SupplierRating = require("./supplierRating.model");
const Supplier = require("../suppliers/supplier.model");
const generateCode = require("../../common/utils/generate-code");

const createSupplierRating = async (payload) => {
    const ratingCode = await generateCode("supplier_rating", "SR");

    const supplier = await Supplier.findById(payload.supplierId);
    if (!supplier) {
        const error = new Error("Supplier not found");
        error.statusCode = 404;
        throw error;
    }

    const rating = await SupplierRating.create({
        ...payload,
        ratingCode,
    });

    return SupplierRating.findById(rating._id).populate("supplierId");
};

const getSupplierRatings = async (query = {}) => {
    const filter = { isDeleted: false };

    if (query.supplierId) {
        filter.supplierId = query.supplierId;
    }

    return SupplierRating.find(filter)
        .populate("supplierId")
        .sort({ createdAt: -1 });
};

const getSupplierRatingById = async (id) => {
    const rating = await SupplierRating.findOne({
        _id: id,
        isDeleted: false,
    }).populate("supplierId");

    if (!rating) {
        const error = new Error("Supplier rating not found");
        error.statusCode = 404;
        throw error;
    }

    return rating;
};

const updateSupplierRating = async (id, payload) => {
    const rating = await SupplierRating.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!rating) {
        const error = new Error("Supplier rating not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.supplierId) {
        const supplier = await Supplier.findById(payload.supplierId);
        if (!supplier) {
            const error = new Error("Supplier not found");
            error.statusCode = 404;
            throw error;
        }

        rating.supplierId = payload.supplierId;
    }

    if (payload.quality !== undefined) rating.quality = payload.quality;
    if (payload.delivery !== undefined) rating.delivery = payload.delivery;
    if (payload.service !== undefined) rating.service = payload.service;
    if (payload.compliance !== undefined) rating.compliance = payload.compliance;
    if (payload.overallRating !== undefined) rating.overallRating = payload.overallRating;

    await rating.save();

    return SupplierRating.findById(rating._id).populate("supplierId");
};

const deleteSupplierRating = async (id) => {
    const rating = await SupplierRating.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!rating) {
        const error = new Error("Supplier rating not found");
        error.statusCode = 404;
        throw error;
    }

    rating.isDeleted = true;
    await rating.save();

    return true;
};

module.exports = {
    createSupplierRating,
    getSupplierRatings,
    getSupplierRatingById,
    updateSupplierRating,
    deleteSupplierRating,
};
