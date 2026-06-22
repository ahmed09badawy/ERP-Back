const Candidate = require("./candidate.model");
const generateCode = require("../../../../common/utils/generate-code");

const createCandidate = async (payload) => {
    const candidateCode = await generateCode("candidate", "CAND");

    const existing = await Candidate.findOne({
        email: payload.email.toLowerCase(),
    });

    if (existing) {
        const error = new Error("Candidate with this email already exists");
        error.statusCode = 400;
        throw error;
    }

    const candidate = await Candidate.create({
        ...payload,
        candidateCode,
        email: payload.email.toLowerCase(),
        appliedDate: payload.appliedDate || new Date(),
    });

    return candidate;
};

const getCandidates = async () => {
    return Candidate.find().sort({ createdAt: -1 });
};

const getCandidateById = async (id) => {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
        const error = new Error("Candidate not found");
        error.statusCode = 404;
        throw error;
    }

    return candidate;
};

const updateCandidate = async (id, payload) => {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
        const error = new Error("Candidate not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.email && payload.email !== candidate.email) {
        const existing = await Candidate.findOne({
            email: payload.email.toLowerCase(),
            _id: { $ne: id },
        });

        if (existing) {
            const error = new Error("Candidate with this email already exists");
            error.statusCode = 400;
            throw error;
        }

        candidate.email = payload.email.toLowerCase();
    }

    delete payload.candidateCode;

    if (payload.fullName !== undefined) candidate.fullName = payload.fullName;
    if (payload.phoneNumber !== undefined) candidate.phoneNumber = payload.phoneNumber;
    if (payload.appliedPosition !== undefined) candidate.appliedPosition = payload.appliedPosition;
    if (payload.expectedSalary !== undefined) candidate.expectedSalary = payload.expectedSalary;
    if (payload.source !== undefined) candidate.source = payload.source;
    if (payload.status !== undefined) candidate.status = payload.status;
    if (payload.appliedDate !== undefined) {
        candidate.appliedDate = new Date(payload.appliedDate);
    }
    if (payload.notes !== undefined) candidate.notes = payload.notes;

    await candidate.save();

    return candidate;
};

const deleteCandidate = async (id) => {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
        const error = new Error("Candidate not found");
        error.statusCode = 404;
        throw error;
    }

    await Candidate.findByIdAndDelete(id);

    return { message: "Candidate deleted successfully" };
};

module.exports = {
    createCandidate,
    getCandidates,
    getCandidateById,
    updateCandidate,
    deleteCandidate,
};
