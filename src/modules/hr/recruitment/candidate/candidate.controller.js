const service = require("./candidate.service");
const { createCandidateSchema, updateCandidateSchema } = require("./candidate.validation");

const createCandidate = async (req, res) => {
    const validatedData = createCandidateSchema.parse(req.body);
    const result = await service.createCandidate(validatedData);

    res.status(201).json({
        success: true,
        message: "Candidate created successfully",
        data: result,
    });
};

const getCandidates = async (req, res) => {
    const result = await service.getCandidates();

    res.status(200).json({
        success: true,
        message: "Candidates retrieved successfully",
        data: result,
    });
};

const getCandidateById = async (req, res) => {
    const result = await service.getCandidateById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Candidate details retrieved successfully",
        data: result,
    });
};

const updateCandidate = async (req, res) => {
    const validatedData = updateCandidateSchema.parse(req.body);
    const result = await service.updateCandidate(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Candidate updated successfully",
        data: result,
    });
};

const deleteCandidate = async (req, res) => {
    await service.deleteCandidate(req.params.id);

    res.status(200).json({
        success: true,
        message: "Candidate deleted successfully",
    });
};

module.exports = {
    createCandidate,
    getCandidates,
    getCandidateById,
    updateCandidate,
    deleteCandidate,
};
