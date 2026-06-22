const service = require("./leave.service");
const { createLeaveSchema, updateLeaveSchema } = require("./leave.validation");

const createLeave = async (req, res) => {
    const validatedData = createLeaveSchema.parse(req.body);
    const result = await service.createLeave(validatedData);

    res.status(201).json({
        success: true,
        message: "Leave created successfully",
        data: result,
    });
};

const getLeaves = async (req, res) => {
    const result = await service.getLeaves();

    res.status(200).json({
        success: true,
        message: "Leaves retrieved successfully",
        data: result,
    });
};

const getLeaveById = async (req, res) => {
    const result = await service.getLeaveById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Leave details retrieved successfully",
        data: result,
    });
};

const updateLeave = async (req, res) => {
    const validatedData = updateLeaveSchema.parse(req.body);
    const result = await service.updateLeave(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Leave updated successfully",
        data: result,
    });
};

const deleteLeave = async (req, res) => {
    await service.deleteLeave(req.params.id);

    res.status(200).json({
        success: true,
        message: "Leave deleted successfully",
    });
};

module.exports = {
    createLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave,
};
