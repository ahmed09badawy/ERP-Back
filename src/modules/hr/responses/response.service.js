const EndOfService = require("../endOfService/endOfService.model");
const Loan = require("../loans/loan.model");
const Leave = require("../leaves/leave.model");
const Request = require("../requests/request.model");

const getResponses = async (type) => {
    let data = [];

    if (type === "end-of-service") {
        const records = await EndOfService.find({ isDeleted: false })
            .populate("employeeInfo")
            .sort({ createdAt: -1 });

        data = records.map((item) => ({
            id: item._id,
            name: item.employeeInfo?.fullName || "N/A",
            date: item.createdAt,
            type: item.eosType,
            status: item.status,
            module: "end-of-service",
        }));
    }

    if (type === "loans") {
        const records = await Loan.find({ isDeleted: false })
            .populate("employeeInfo")
            .sort({ createdAt: -1 });

        data = records.map((item) => ({
            id: item._id,
            name: item.employeeInfo?.fullName || "N/A",
            date: item.createdAt,
            type: "Loan Request",
            status: item.status,
            module: "loans",
        }));
    }

    if (type === "leaves") {
        const records = await Leave.find()
            .populate("employeeId")
            .populate("approverId")
            .sort({ createdAt: -1 });

        data = records.map((item) => ({
            id: item._id,
            leaveId: item.leaveId,
            name: item.employeeId?.fullName || item.employeeId?.name || "N/A",
            date: item.createdAt,
            type: item.leaveType,
            status: item.status,
            workflowStatus: item.workflowStatus,
            module: "leaves",
        }));
    }

    if (type === "requests") {
        const records = await Request.find()
            .populate("employeeId")
            .populate("approvedBy")
            .sort({ createdAt: -1 });

        data = records.map((item) => ({
            id: item._id,
            requestNumber: item.requestNumber,
            name: item.employeeId?.fullName || item.employeeId?.name || "N/A",
            date: item.requestDate || item.createdAt,
            type: item.requestType,
            status: item.status,
            priority: item.priority,
            module: "requests",
        }));
    }

    return data;
};

const getResponseDetails = async (module, id) => {
    if (module === "end-of-service") {
        return await EndOfService.findById(id)
            .populate("employeeInfo")
            .populate("department");
    }

    if (module === "loans") {
        return await Loan.findById(id).populate("employeeInfo");
    }

    if (module === "leaves") {
        return await Leave.findById(id).populate("employeeId");
    }

    if (module === "requests") {
        return await Request.findById(id).populate("employeeInfo");
    }

    throw new Error("Invalid module");
};

module.exports = {
    getResponses,
    getResponseDetails,
};
