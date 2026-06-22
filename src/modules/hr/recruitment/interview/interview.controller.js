const service = require("./interview.service");
const { createInterviewSchema, updateInterviewSchema } = require("./interview.validation");

const createInterview = async (req, res) => {
    const validatedData = createInterviewSchema.parse(req.body);
    const result = await service.createInterview(validatedData);

    res.status(201).json({
        success: true,
        message: "Interview record created successfully",
        data: result,
    });
};

const getInterviews = async (req, res) => {
    const result = await service.getInterviews();

    res.status(200).json({
        success: true,
        message: "Interview records retrieved successfully",
        data: result,
    });
};

const getInterviewById = async (req, res) => {
    const result = await service.getInterviewById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Interview record details retrieved successfully",
        data: result,
    });
};

const updateInterview = async (req, res) => {
    const validatedData = updateInterviewSchema.parse(req.body);
    const result = await service.updateInterview(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Interview record updated successfully",
        data: result,
    });
};

const deleteInterview = async (req, res) => {
    await service.deleteInterview(req.params.id);

    res.status(200).json({
        success: true,
        message: "Interview record deleted successfully",
    });
};

module.exports = {
    createInterview,
    getInterviews,
    getInterviewById,
    updateInterview,
    deleteInterview,
};
