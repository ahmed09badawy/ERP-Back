const branchService = require("./branch.service");
const {
    createBranchSchema,
    updateBranchSchema,
    updateBranchStateSchema,
} = require("./branch.validation");

const createBranch = async (req, res) => {
    const validatedData = createBranchSchema.parse(req.body);
    const branch = await branchService.createBranch(validatedData);

    res.status(201).json({
        success: true,
        message: "Branch created successfully",
        data: branch,
    });
};

const getBranches = async (req, res) => {
    const branches = await branchService.getBranches();

    res.status(200).json({
        success: true,
        data: branches,
    });
};

const getBranchById = async (req, res) => {
    const branch = await branchService.getBranchById(req.params.id);

    res.status(200).json({
        success: true,
        data: branch,
    });
};

const updateBranch = async (req, res) => {
    const validatedData = updateBranchSchema.parse(req.body);
    const branch = await branchService.updateBranch(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Branch updated successfully",
        data: branch,
    });
};

const updateBranchState = async (req, res) => {
    const validatedData = updateBranchStateSchema.parse(req.body);
    const branch = await branchService.updateBranchState(req.params.id, validatedData.state);

    res.status(200).json({
        success: true,
        message: "Branch state updated successfully",
        data: branch,
    });
};

const deleteBranch = async (req, res) => {
    await branchService.deleteBranch(req.params.id);

    res.status(200).json({
        success: true,
        message: "Branch deleted successfully",
    });
};

module.exports = {
    createBranch,
    getBranches,
    getBranchById,
    updateBranch,
    updateBranchState,
    deleteBranch,
};
