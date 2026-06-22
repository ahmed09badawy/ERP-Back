const CareerHistory = require("./careerHistory.model");
const Employee = require("../employee/employee.model");
const Job = require("../job/job.model");
const generateCode = require("../../../common/utils/generate-code");

const createCareerHistory = async (payload) => {
    const careerCode = await generateCode("career_history", "CHR");

    const employee = await Employee.findById(payload.employeeId);
    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    const newJob = await Job.findById(payload.newJobId);
    if (!newJob) {
        const error = new Error("New job not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.previousJobId) {
        const prevJob = await Job.findById(payload.previousJobId);
        if (!prevJob) {
            const error = new Error("Previous job not found");
            error.statusCode = 404;
            throw error;
        }
    }

    const record = await CareerHistory.create({
        ...payload,
        careerCode,
        effectiveDate: new Date(payload.effectiveDate),
    });

    return CareerHistory.findById(record._id).populate(
        "employeeId previousJobId newJobId"
    );
};

const getCareerHistory = async () => {
    return CareerHistory.find()
        .populate("employeeId previousJobId newJobId")
        .sort({ effectiveDate: -1 });
};

const getCareerHistoryById = async (id) => {
    const record = await CareerHistory.findById(id).populate(
        "employeeId previousJobId newJobId"
    );

    if (!record) {
        const error = new Error("Career history record not found");
        error.statusCode = 404;
        throw error;
    }

    return record;
};

const updateCareerHistory = async (id, payload) => {
    const record = await CareerHistory.findById(id);

    if (!record) {
        const error = new Error("Career history record not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.employeeId) {
        const employee = await Employee.findById(payload.employeeId);
        if (!employee) {
            const error = new Error("Employee not found");
            error.statusCode = 404;
            throw error;
        }
        record.employeeId = payload.employeeId;
    }

    if (payload.newJobId) {
        const newJob = await Job.findById(payload.newJobId);
        if (!newJob) {
            const error = new Error("New job not found");
            error.statusCode = 404;
            throw error;
        }
        record.newJobId = payload.newJobId;
    }

    if (payload.previousJobId !== undefined) {
        if (payload.previousJobId) {
            const prevJob = await Job.findById(payload.previousJobId);
            if (!prevJob) {
                const error = new Error("Previous job not found");
                error.statusCode = 404;
                throw error;
            }
        }
        record.previousJobId = payload.previousJobId || null;
    }

    if (payload.previousGrade !== undefined) record.previousGrade = payload.previousGrade;
    if (payload.newGrade !== undefined) record.newGrade = payload.newGrade;
    if (payload.previousSalary !== undefined) record.previousSalary = payload.previousSalary;
    if (payload.newSalary !== undefined) record.newSalary = payload.newSalary;
    if (payload.effectiveDate !== undefined) record.effectiveDate = new Date(payload.effectiveDate);
    if (payload.changeType !== undefined) record.changeType = payload.changeType;
    if (payload.notes !== undefined) record.notes = payload.notes;

    await record.save();

    return CareerHistory.findById(record._id).populate(
        "employeeId previousJobId newJobId"
    );
};

const deleteCareerHistory = async (id) => {
    const record = await CareerHistory.findById(id);

    if (!record) {
        const error = new Error("Career history record not found");
        error.statusCode = 404;
        throw error;
    }

    await CareerHistory.findByIdAndDelete(id);

    return { message: "Career history record deleted successfully" };
};

module.exports = {
    createCareerHistory,
    getCareerHistory,
    getCareerHistoryById,
    updateCareerHistory,
    deleteCareerHistory,
};
