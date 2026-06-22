const service = require("./job.service");
const { createJobSchema, updateJobSchema } = require("./job.validation");

const createJob = async (req, res) => {
    const validatedData = createJobSchema.parse(req.body);
    const result = await service.createJob(validatedData);

    res.status(201).json({
        success: true,
        message: "Job created successfully",
        data: result,
    });
};

const getJobs = async (req, res) => {
    const result = await service.getJobs();

    res.status(200).json({
        success: true,
        message: "Jobs retrieved successfully",
        data: result,
    });
};

const getJobById = async (req, res) => {
    const result = await service.getJobById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Job details retrieved successfully",
        data: result,
    });
};

const updateJob = async (req, res) => {
    const validatedData = updateJobSchema.parse(req.body);
    const result = await service.updateJob(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Job updated successfully",
        data: result,
    });
};

const deleteJob = async (req, res) => {
    await service.deleteJob(req.params.id);

    res.status(200).json({
        success: true,
        message: "Job deleted successfully",
    });
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
};
