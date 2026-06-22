const Hire = require("./hire.model");
const Candidate = require("../candidate/candidate.model");
const Offer = require("../offer/offer.model");
const generateCode = require("../../../../common/utils/generate-code");

const createHire = async (payload) => {
    const hireCode = await generateCode("hire", "HIRE");

    const candidate = await Candidate.findById(payload.candidateId);
    if (!candidate) {
        const error = new Error("Candidate not found");
        error.statusCode = 404;
        throw error;
    }

    const offer = await Offer.findById(payload.offerId);
    if (!offer) {
        const error = new Error("Offer not found");
        error.statusCode = 404;
        throw error;
    }

    candidate.status = "HIRED";
    await candidate.save();

    const hire = await Hire.create({
        ...payload,
        hireCode,
        joiningDate: new Date(payload.joiningDate),
    });

    return Hire.findById(hire._id).populate("candidateId offerId");
};

const getHires = async () => {
    return Hire.find()
        .populate("candidateId offerId")
        .sort({ createdAt: -1 });
};

const getHireById = async (id) => {
    const hire = await Hire.findById(id).populate("candidateId offerId");

    if (!hire) {
        const error = new Error("Hire record not found");
        error.statusCode = 404;
        throw error;
    }

    return hire;
};

const updateHire = async (id, payload) => {
    const hire = await Hire.findById(id);

    if (!hire) {
        const error = new Error("Hire record not found");
        error.statusCode = 404;
        throw error;
    }

    delete payload.hireCode;

    if (payload.candidateId) {
        const candidate = await Candidate.findById(payload.candidateId);
        if (!candidate) {
            const error = new Error("Candidate not found");
            error.statusCode = 404;
            throw error;
        }

        hire.candidateId = payload.candidateId;
    }

    if (payload.offerId) {
        const offer = await Offer.findById(payload.offerId);
        if (!offer) {
            const error = new Error("Offer not found");
            error.statusCode = 404;
            throw error;
        }

        hire.offerId = payload.offerId;
    }

    if (payload.joiningDate !== undefined) {
        hire.joiningDate = new Date(payload.joiningDate);
    }

    if (payload.onboardingStatus !== undefined) {
        hire.onboardingStatus = payload.onboardingStatus;
    }

    if (payload.employeeCreated !== undefined) {
        hire.employeeCreated = payload.employeeCreated;
    }

    if (payload.notes !== undefined) {
        hire.notes = payload.notes;
    }

    await hire.save();

    return Hire.findById(hire._id).populate("candidateId offerId");
};

const deleteHire = async (id) => {
    const hire = await Hire.findById(id);

    if (!hire) {
        const error = new Error("Hire record not found");
        error.statusCode = 404;
        throw error;
    }

    await Hire.findByIdAndDelete(id);

    return { message: "Hire record deleted successfully" };
};

module.exports = {
    createHire,
    getHires,
    getHireById,
    updateHire,
    deleteHire,
};
