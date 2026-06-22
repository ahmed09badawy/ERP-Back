const Loan = require("./loan.model");
const Employee = require("../employee/employee.model");
const generateCode = require("../../../common/utils/generate-code");

const createLoan = async (data) => {
    const loanId = await generateCode("loan", "LOAN");

    const employee = await Employee.findById(data.employeeInfo);
    if (!employee) {
        throw new Error("Employee not found");
    }

    const loan = await Loan.create({
        ...data,
        loanId,
        remainingAmount: data.loanAmount,
    });

    return Loan.findById(loan._id).populate("employeeInfo");
};

const getAllLoans = async (query) => {
    const { page = 1, limit = 10, employeeInfo, status } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const loans = await Loan.find(filter)
        .populate("employeeInfo")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Loan.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: loans,
    };
};

const getLoanById = async (id) => {
    const loan = await Loan.findOne({ _id: id, isDeleted: false })
        .populate("employeeInfo");

    if (!loan) {
        throw new Error("Loan not found");
    }

    return loan;
};

const updateLoan = async (id, data) => {
    const loan = await Loan.findOne({ _id: id, isDeleted: false });

    if (!loan) {
        throw new Error("Loan not found");
    }

    delete data.loanId;

    if (data.employeeInfo) {
        const employee = await Employee.findById(data.employeeInfo);
        if (!employee) {
            throw new Error("Employee not found");
        }
        loan.employeeInfo = data.employeeInfo;
    }

    if (data.status === "Approved") {
        loan.approvalBy = data.approvalBy || "Manager";
    }

    if (data.status === "Rejected") {
        if (!data.rejectedReason) {
            throw new Error("Rejected reason is required");
        }
    }

    if (data.loanAmount !== undefined) {
        loan.loanAmount = data.loanAmount;
    }

    if (data.remainingAmount !== undefined) {
        loan.remainingAmount = data.remainingAmount;
    }

    if (data.deductionType !== undefined) {
        loan.deductionType = data.deductionType;
    }

    if (data.installmentAmount !== undefined) {
        loan.installmentAmount = data.installmentAmount;
    }

    if (data.startMonth !== undefined) {
        loan.startMonth = data.startMonth;
    }

    if (data.reason !== undefined) {
        loan.reason = data.reason;
    }

    if (data.status !== undefined) {
        loan.status = data.status;
    }

    if (data.rejectedReason !== undefined) {
        loan.rejectedReason = data.rejectedReason;
    }

    await loan.save();

    return Loan.findById(loan._id).populate("employeeInfo");
};

const deleteLoan = async (id) => {
    const loan = await Loan.findOne({ _id: id, isDeleted: false });

    if (!loan) {
        throw new Error("Loan not found");
    }

    loan.isDeleted = true;
    await loan.save();

    return true;
};

module.exports = {
    createLoan,
    getAllLoans,
    getLoanById,
    updateLoan,
    deleteLoan,
};
