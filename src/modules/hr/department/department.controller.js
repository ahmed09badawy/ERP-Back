const service = require("./department.service");
const { createDepartmentSchema, updateDepartmentSchema } = require("./department.validation");

const createDepartment = async (req, res) => {
    const validatedData = createDepartmentSchema.parse(req.body);

    const result = await service.createDepartment(validatedData);

    res.status(201).json({
        success: true,
        message: "Department created successfully",
        data: result,
    });
};

const getDepartments = async (req, res) => {
    const result = await service.getDepartments();

    res.status(200).json({
        success: true,
        message: "Departments retrieved successfully",
        data: result,
    });
};

const getDepartmentById = async (req, res) => {
    const result = await service.getDepartmentById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Department retrieved successfully",
        data: result,
    });
};

const updateDepartment = async (req, res) => {
    const validatedData = updateDepartmentSchema.parse(req.body);
    const result = await service.updateDepartment(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Department updated successfully",
        data: result,
    });
};

const deleteDepartment = async (req, res) => {
    await service.deleteDepartment(req.params.id);

    res.status(200).json({
        success: true,
        message: "Department deleted successfully",
    });
};

module.exports = {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
};
