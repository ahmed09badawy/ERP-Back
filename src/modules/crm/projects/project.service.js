const Project = require("./project.model");
const Counter = require("../../assets/counter.model");

const generateProjectCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "project" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `PRJ-${String(counter.seq).padStart(4, "0")}`;
};

const createProject = async (data) => {
    data.projectCode = await generateProjectCode();
    return await Project.create(data);
};

const getAllProjects = async (query) => {
    const { page = 1, limit = 10 } = query;

    const projects = await Project.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

    return projects;
};

const getProjectById = async (id) => {
    return await Project.findById(id);
};

const updateProject = async (id, data) => {
    return await Project.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

const deleteProject = async (id) => {
    return await Project.findByIdAndUpdate(id, { isDeleted: true });
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
