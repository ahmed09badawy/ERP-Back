const Offer = require("./offer.model");
const Candidate = require("../candidate/candidate.model");
const generateCode = require("../../../../common/utils/generate-code");

const createOffer = async (payload) => {
    const offerCode = await generateCode("offer", "OFF");

    const candidate = await Candidate.findById(payload.candidateId);

    if (!candidate) {
        const error = new Error("Candidate not found");
        error.statusCode = 404;
        throw error;
    }

    const offer = await Offer.create({
        ...payload,
        offerCode,
        joiningDate: payload.joiningDate || null,
    });

    return Offer.findById(offer._id).populate("candidateId");
};

const getOffers = async () => {
    return Offer.find()
        .populate("candidateId")
        .sort({ createdAt: -1 });
};

const getOfferById = async (id) => {
    const offer = await Offer.findById(id).populate("candidateId");

    if (!offer) {
        const error = new Error("Offer record not found");
        error.statusCode = 404;
        throw error;
    }

    return offer;
};

const updateOffer = async (id, payload) => {
    const offer = await Offer.findById(id);

    if (!offer) {
        const error = new Error("Offer record not found");
        error.statusCode = 404;
        throw error;
    }

    delete payload.offerCode;

    if (payload.candidateId) {
        const candidate = await Candidate.findById(payload.candidateId);

        if (!candidate) {
            const error = new Error("Candidate not found");
            error.statusCode = 404;
            throw error;
        }

        offer.candidateId = payload.candidateId;
    }

    if (payload.offeredPosition !== undefined) offer.offeredPosition = payload.offeredPosition;
    if (payload.offeredSalary !== undefined) offer.offeredSalary = payload.offeredSalary;
    if (payload.joiningDate !== undefined) offer.joiningDate = payload.joiningDate || null;
    if (payload.status !== undefined) offer.status = payload.status;
    if (payload.notes !== undefined) offer.notes = payload.notes;

    await offer.save();

    return Offer.findById(offer._id).populate("candidateId");
};

const deleteOffer = async (id) => {
    const offer = await Offer.findById(id);

    if (!offer) {
        const error = new Error("Offer record not found");
        error.statusCode = 404;
        throw error;
    }

    await Offer.findByIdAndDelete(id);

    return { message: "Offer record deleted successfully" };
};

module.exports = {
    createOffer,
    getOffers,
    getOfferById,
    updateOffer,
    deleteOffer,
};
