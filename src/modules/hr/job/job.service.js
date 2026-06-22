const Job = require("./job.model");
const Department = require("../department/department.model");
const generateCode = require("../../../common/utils/generate-code");

const createJob = async (payload) => {
    const jobCode = await generateCode("job", "JOB");

    const department = await Department.findById(payload.departmentId);
    if (!department) {
        const error = new Error("Department not found");
        error.statusCode = 404;
        throw error;
    }

    const job = await Job.create({
        ...payload,
        jobCode,
    });

    return Job.findById(job._id).populate("departmentId");
};

const getJobs = async () => {
    return Job.find()
        .populate("departmentId")
        .sort({ createdAt: -1 });
};

const getJobById = async (id) => {
    const job = await Job.findById(id).populate("departmentId");

    if (!job) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        throw error;
    }

    return job;
};

const updateJob = async (id, payload) => {
    const job = await Job.findById(id);

    if (!job) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.departmentId) {
        const department = await Department.findById(payload.departmentId);
        if (!department) {
            const error = new Error("Department not found");
            error.statusCode = 404;
            throw error;
        }
        job.departmentId = payload.departmentId;
    }

    if (payload.jobName !== undefined) job.jobName = payload.jobName;
    if (payload.description !== undefined) job.description = payload.description;
    if (payload.state !== undefined) job.state = payload.state;

    await job.save();

    return Job.findById(job._id).populate("departmentId");
};

const deleteJob = async (id) => {
    const job = await Job.findById(id);

    if (!job) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        throw error;
    }

    await Job.findByIdAndDelete(id);

    return { message: "Job deleted successfully" };
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
};
