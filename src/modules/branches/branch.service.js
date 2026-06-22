const Branch = require("./branch.model");
const Company = require("../companies/company.model");
const generateCode = require("../../common/utils/generate-code");

const createBranch = async ({ companyId, name, email, address }) => {
    const company = await Company.findById(companyId);
    if (!company) {
        const error = new Error("Company not found");
        error.statusCode = 404;
        throw error;
    }

    const existingBranch = await Branch.findOne({ companyId, name });
    if (existingBranch) {
        const error = new Error("Branch already exists for this company");
        error.statusCode = 400;
        throw error;
    }

    const branchCode = await generateCode("branch", "BR");

    const branch = await Branch.create({
        branchCode,
        companyId,
        name,
        email: email || "",
        address: address || "",
    });

    return Branch.findById(branch._id).populate("companyId");
};

const getBranches = async () => {
    return Branch.find().populate("companyId").sort({ createdAt: -1 });
};

const getBranchById = async (id) => {
    const branch = await Branch.findById(id).populate("companyId");
    if (!branch) {
        const error = new Error("Branch not found");
        error.statusCode = 404;
        throw error;
    }

    return branch;
};

const updateBranch = async (id, payload) => {
    const branch = await Branch.findById(id);
    if (!branch) {
        const error = new Error("Branch not found");
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
        branch.companyId = payload.companyId;
    }

    if (payload.name) branch.name = payload.name;
    if (payload.email !== undefined) branch.email = payload.email;
    if (payload.address !== undefined) branch.address = payload.address;
    if (payload.state) branch.state = payload.state;

    await branch.save();

    return Branch.findById(branch._id).populate("companyId");
};

const updateBranchState = async (id, state) => {
    const branch = await Branch.findById(id);
    if (!branch) {
        const error = new Error("Branch not found");
        error.statusCode = 404;
        throw error;
    }

    branch.state = state;
    await branch.save();

    return Branch.findById(branch._id).populate("companyId");
};

const deleteBranch = async (id) => {
    const branch = await Branch.findById(id);
    if (!branch) {
        const error = new Error("Branch not found");
        error.statusCode = 404;
        throw error;
    }

    await branch.deleteOne();
    return { message: "Branch deleted successfully" };
};

module.exports = {
    createBranch,
    getBranches,
    getBranchById,
    updateBranch,
    updateBranchState,
    deleteBranch,
};
