const service = require("./employee.service");
const { createEmployeeSchema, updateEmployeeSchema } = require("./employee.validation");

const createEmployee = async (req, res) => {
    const validatedData = createEmployeeSchema.parse(req.body);
    const result = await service.createEmployee(validatedData);

    res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: result,
    });
};

const getEmployees = async (req, res) => {
    const result = await service.getEmployees();

    res.status(200).json({
        success: true,
        message: "Employees retrieved successfully",
        data: result,
    });
};

const getEmployeeById = async (req, res) => {
    const result = await service.getEmployeeById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Employee details retrieved successfully",
        data: result,
    });
};

const updateEmployee = async (req, res) => {
    const validatedData = updateEmployeeSchema.parse(req.body);
    const result = await service.updateEmployee(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        data: result,
    });
};

const deleteEmployee = async (req, res) => {
    await service.deleteEmployee(req.params.id);

    res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
    });
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};
