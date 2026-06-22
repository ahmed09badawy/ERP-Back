const Employee = require("./employee.model");
const Company = require("../../companies/company.model");
const Branch = require("../../branches/branch.model");
const Department = require("../department/department.model");
const Job = require("../job/job.model");
const generateCode = require("../../../common/utils/generate-code");


const createEmployee = async (payload) => {
    const employeeCode = await generateCode("employee", "EMP");

    if (payload.email) {
        const existingEmail = await Employee.findOne({
            email: payload.email.toLowerCase(),
        });

        if (existingEmail) {
            const error = new Error("Employee email already exists");
            error.statusCode = 400;
            throw error;
        }
    }

    const company = await Company.findById(payload.companyId);
    if (!company) {
        const error = new Error("Company not found");
        error.statusCode = 404;
        throw error;
    }

    const branch = await Branch.findById(payload.branchId);
    if (!branch) {
        const error = new Error("Branch not found");
        error.statusCode = 404;
        throw error;
    }

    const department = await Department.findById(payload.departmentId);
    if (!department) {
        const error = new Error("Department not found");
        error.statusCode = 404;
        throw error;
    }

    const job = await Job.findById(payload.jobId);
    if (!job) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.directManagerId) {
        const manager = await Employee.findById(payload.directManagerId);
        if (!manager) {
            const error = new Error("Direct manager not found");
            error.statusCode = 404;
            throw error;
        }
    }

    const employee = await Employee.create({
        ...payload,
        employeeCode,
        code: employeeCode,
        email: payload.email ? payload.email.toLowerCase() : "",
        directManagerId: payload.directManagerId || null,
        documents: payload.documents || [],
    });

    return Employee.findById(employee._id)
        .populate("companyId branchId departmentId jobId directManagerId");
};

const getEmployees = async () => {
    return Employee.find()
        .populate("companyId branchId departmentId jobId directManagerId")
        .sort({ createdAt: -1 });
};

const getEmployeeById = async (id) => {
    const employee = await Employee.findById(id)
        .populate("companyId branchId departmentId jobId directManagerId");

    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    return employee;
};

const updateEmployee = async (id, payload) => {
    const employee = await Employee.findById(id);

    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.email && payload.email.toLowerCase() !== employee.email) {
        const existingEmail = await Employee.findOne({
            email: payload.email.toLowerCase(),
        });

        if (existingEmail) {
            const error = new Error("Employee email already exists");
            error.statusCode = 400;
            throw error;
        }

        employee.email = payload.email.toLowerCase();
    }

    if (payload.companyId) employee.companyId = payload.companyId;
    if (payload.branchId) employee.branchId = payload.branchId;
    if (payload.departmentId) employee.departmentId = payload.departmentId;
    if (payload.jobId) employee.jobId = payload.jobId;

    if (payload.directManagerId !== undefined) {
        employee.directManagerId = payload.directManagerId || null;
    }

    if (payload.fullName !== undefined) employee.fullName = payload.fullName;
    if (payload.photo !== undefined) employee.photo = payload.photo;
    if (payload.idNumber !== undefined) employee.idNumber = payload.idNumber;
    if (payload.nationality !== undefined) employee.nationality = payload.nationality;
    if (payload.gosiId !== undefined) employee.gosiId = payload.gosiId;
    if (payload.birthDate !== undefined) employee.birthDate = payload.birthDate || null;
    if (payload.gender !== undefined) employee.gender = payload.gender || null;
    if (payload.maritalStatus !== undefined) employee.maritalStatus = payload.maritalStatus || null;
    if (payload.phoneNumber !== undefined) employee.phoneNumber = payload.phoneNumber;
    if (payload.address !== undefined) employee.address = payload.address;
    if (payload.employeeStatus !== undefined) employee.employeeStatus = payload.employeeStatus;
    if (payload.hireDate !== undefined) employee.hireDate = payload.hireDate || null;

    if (payload.contractStartDate !== undefined) {
        employee.contractStartDate = payload.contractStartDate || null;
    }

    if (payload.contractEndDate !== undefined) {
        employee.contractEndDate = payload.contractEndDate || null;
    }

    if (payload.contractType !== undefined) {
        employee.contractType = payload.contractType || null;
    }

    if (payload.internalEmployeeNumber !== undefined) {
        employee.internalEmployeeNumber = payload.internalEmployeeNumber;
    }

    if (payload.jobGrade !== undefined) {
        employee.jobGrade = payload.jobGrade;
    }

    if (payload.documents !== undefined) {
        employee.documents = payload.documents || [];
    }

    if (payload.bankInfo !== undefined) {
        employee.bankInfo = {
            bankName: payload.bankInfo.bankName || "",
            accountNumber: payload.bankInfo.accountNumber || "",
        };
    }

    await employee.save();

    return Employee.findById(employee._id)
        .populate("companyId branchId departmentId jobId directManagerId");
};

const deleteEmployee = async (id) => {
    const employee = await Employee.findById(id);
    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    await employee.deleteOne();
    return { message: "Employee deleted successfully" };
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};
