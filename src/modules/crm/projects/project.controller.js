const service = require("./project.service");
const {
    createProjectSchema,
    updateProjectSchema,
} = require("./project.validation");

const createProject = async (req, res) => {
    const validated = createProjectSchema.parse(req.body);
    const result = await service.createProject(validated);

    res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: result,
    });
};

const getAllProjects = async (req, res) => {
    const result = await service.getAllProjects(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getProjectById = async (req, res) => {
    const result = await service.getProjectById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateProject = async (req, res) => {
    const validated = updateProjectSchema.parse(req.body);
    const result = await service.updateProject(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: result,
    });
};

const deleteProject = async (req, res) => {
    await service.deleteProject(req.params.id);

    res.status(200).json({
        success: true,
        message: "Project deleted successfully",
    });
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
