const service = require("./offer.service");
const { createOfferSchema, updateOfferSchema } = require("./offer.validation");

const createOffer = async (req, res) => {
    const validatedData = createOfferSchema.parse(req.body);
    const result = await service.createOffer(validatedData);

    res.status(201).json({
        success: true,
        message: "Offer record created successfully",
        data: result,
    });
};

const getOffers = async (req, res) => {
    const result = await service.getOffers();

    res.status(200).json({
        success: true,
        message: "Offer records retrieved successfully",
        data: result,
    });
};

const getOfferById = async (req, res) => {
    const result = await service.getOfferById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Offer record details retrieved successfully",
        data: result,
    });
};

const updateOffer = async (req, res) => {
    const validatedData = updateOfferSchema.parse(req.body);
    const result = await service.updateOffer(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Offer record updated successfully",
        data: result,
    });
};

const deleteOffer = async (req, res) => {
    await service.deleteOffer(req.params.id);

    res.status(200).json({
        success: true,
        message: "Offer record deleted successfully",
    });
};

module.exports = {
    createOffer,
    getOffers,
    getOfferById,
    updateOffer,
    deleteOffer,
};
