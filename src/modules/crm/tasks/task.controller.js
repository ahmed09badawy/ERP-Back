const service = require("./task.service");
const {
    createTaskSchema,
    updateTaskSchema,
} = require("./task.validation");

const createTask = async (req, res) => {
    const validated = createTaskSchema.parse(req.body);
    const result = await service.createTask(validated);

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: result,
    });
};

const getAllTasks = async (req, res) => {
    const result = await service.getAllTasks(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getTaskById = async (req, res) => {
    const result = await service.getTaskById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateTask = async (req, res) => {
    const validated = updateTaskSchema.parse(req.body);
    const result = await service.updateTask(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: result,
    });
};

const deleteTask = async (req, res) => {
    await service.deleteTask(req.params.id);

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
    });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
