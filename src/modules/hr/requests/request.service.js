const EmployeeRequest = require("./request.model");
const Employee = require("../employee/employee.model");

const createRequest = async (payload) => {
    const employee = await Employee.findById(payload.employeeId);
    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.approvedBy) {
        const approver = await Employee.findById(payload.approvedBy);
        if (!approver) {
            const error = new Error("Approver not found");
            error.statusCode = 404;
            throw error;
        }
    }

    const existing = await EmployeeRequest.findOne({
        requestNumber: payload.requestNumber.toUpperCase(),
    });

    if (existing) {
        const error = new Error("Request number already exists");
        error.statusCode = 400;
        throw error;
    }

    const request = await EmployeeRequest.create({
        ...payload,
        requestNumber: payload.requestNumber.toUpperCase(),
        dueDate: payload.dueDate ? new Date(payload.dueDate) : null,
        approvalDate: payload.status === "APPROVED" ? new Date() : null,
    });

    return EmployeeRequest.findById(request._id).populate("employeeId approvedBy");
};

const getRequests = async () => {
    return EmployeeRequest.find()
        .populate("employeeId approvedBy")
        .sort({ createdAt: -1 });
};

const getRequestById = async (id) => {
    const request = await EmployeeRequest.findById(id).populate(
        "employeeId approvedBy"
    );

    if (!request) {
        const error = new Error("Request not found");
        error.statusCode = 404;
        throw error;
    }

    return request;
};

const updateRequest = async (id, payload) => {
    const request = await EmployeeRequest.findById(id);
    if (!request) {
        const error = new Error("Request not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(request, payload);

    if (payload.dueDate !== undefined) {
        request.dueDate = payload.dueDate ? new Date(payload.dueDate) : null;
    }

    if (payload.status === "APPROVED") {
        request.approvalDate = new Date();
    }

    await request.save();

    return EmployeeRequest.findById(request._id).populate("employeeId approvedBy");
};

const deleteRequest = async (id) => {
    const request = await EmployeeRequest.findByIdAndDelete(id);
    if (!request) {
        const error = new Error("Request not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Request deleted successfully" };
};

module.exports = {
    createRequest,
    getRequests,
    getRequestById,
    updateRequest,
    deleteRequest,
};
