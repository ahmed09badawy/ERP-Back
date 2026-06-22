const Interview = require("./interview.model");
const Candidate = require("../candidate/candidate.model");
const generateCode = require("../../../../common/utils/generate-code");

const createInterview = async (payload) => {
    const interviewCode = await generateCode("interview", "INT");

    const candidate = await Candidate.findById(payload.candidateId);
    if (!candidate) {
        const error = new Error("Candidate not found");
        error.statusCode = 404;
        throw error;
    }

    const interview = await Interview.create({
        ...payload,
        interviewCode,
        interviewDate: new Date(payload.interviewDate),
    });

    return Interview.findById(interview._id).populate("candidateId");
};

const getInterviews = async () => {
    return Interview.find()
        .populate("candidateId")
        .sort({ interviewDate: -1 });
};

const getInterviewById = async (id) => {
    const interview = await Interview.findById(id).populate("candidateId");

    if (!interview) {
        const error = new Error("Interview record not found");
        error.statusCode = 404;
        throw error;
    }

    return interview;
};

const updateInterview = async (id, payload) => {
    const interview = await Interview.findById(id);

    if (!interview) {
        const error = new Error("Interview record not found");
        error.statusCode = 404;
        throw error;
    }

    delete payload.interviewCode;

    if (payload.candidateId) {
        const candidate = await Candidate.findById(payload.candidateId);
        if (!candidate) {
            const error = new Error("Candidate not found");
            error.statusCode = 404;
            throw error;
        }

        interview.candidateId = payload.candidateId;
    }

    if (payload.round !== undefined) interview.round = payload.round;
    if (payload.interviewerName !== undefined) interview.interviewerName = payload.interviewerName;
    if (payload.interviewDate !== undefined) {
        interview.interviewDate = new Date(payload.interviewDate);
    }
    if (payload.score !== undefined) interview.score = payload.score;
    if (payload.result !== undefined) interview.result = payload.result;
    if (payload.feedback !== undefined) interview.feedback = payload.feedback;
    if (payload.nextStep !== undefined) interview.nextStep = payload.nextStep;

    await interview.save();

    return Interview.findById(interview._id).populate("candidateId");
};

const deleteInterview = async (id) => {
    const interview = await Interview.findById(id);

    if (!interview) {
        const error = new Error("Interview record not found");
        error.statusCode = 404;
        throw error;
    }

    await Interview.findByIdAndDelete(id);

    return { message: "Interview record deleted successfully" };
};

module.exports = {
    createInterview,
    getInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview,
};
