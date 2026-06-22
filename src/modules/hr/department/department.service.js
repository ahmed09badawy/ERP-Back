const Department = require("./department.model");
const Company = require("../../companies/company.model");
const generateCode = require("../../../common/utils/generate-code");

const createDepartment = async (payload) => {
    const departmentCode = await generateCode("department", "DEP");

    const company = await Company.findById(payload.companyId);
    if (!company) {
        const error = new Error("Company not found");
        error.statusCode = 404;
        throw error;
    }

    const department = await Department.create({
        ...payload,
        departmentCode,
    });

    return department;
};

const getDepartments = async () => {
    return Department.find()
        .populate("companyId")
        .sort({ createdAt: -1 });
};

const getDepartmentById = async (id) => {
    const department = await Department.findById(id).populate("companyId");

    if (!department) {
        const error = new Error("Department not found");
        error.statusCode = 404;
        throw error;
    }

    return department;
};

const updateDepartment = async (id, payload) => {
    const department = await Department.findById(id);

    if (!department) {
        const error = new Error("Department not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.companyId) {
        const company = await Company.findById(payload.companyId);
        if (!company) {
            const error = new Error("Company not found");
            error.statusCode = 404;
            throw error;
        }
        department.companyId = payload.companyId;
    }

    if (payload.departmentName !== undefined)
        department.departmentName = payload.departmentName;
    if (payload.managerName !== undefined)
        department.managerName = payload.managerName;
    if (payload.state !== undefined)
        department.state = payload.state;

    await department.save();

    return Department.findById(department._id).populate("companyId");
};

const deleteDepartment = async (id) => {
    const department = await Department.findById(id);

    if (!department) {
        const error = new Error("Department not found");
        error.statusCode = 404;
        throw error;
    }

    await Department.findByIdAndDelete(id);

    return { message: "Department deleted successfully" };
};

module.exports = {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
};
