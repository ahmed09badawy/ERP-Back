const Task = require("./task.model");
const Counter = require("../../assets/counter.model");

const generateTaskCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "task" },
        { $inc: { seq: 1 } },
        {
            returnDocument: "after",
            upsert: true
        }
    );

    return `TSK-${String(counter.seq).padStart(4, "0")}`;
};

const createTask = async (data) => {
    data.taskCode = await generateTaskCode();
    return await Task.create(data);
};

const getAllTasks = async (query) => {
    const { page = 1, limit = 10 } = query;

    const tasks = await Task.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

    return tasks;
};

const getTaskById = async (id) => {
    return await Task.findById(id);
};

const updateTask = async (id, data) => {
    return await Task.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

const deleteTask = async (id) => {
    return await Task.findByIdAndUpdate(id, { isDeleted: true });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
