const roleService = require("./role.service");
const {
    createRoleSchema,
    updateRoleSchema,
    updateRoleStateSchema,
} = require("./role.validation");

const createRole = async (req, res) => {
    const validatedData = createRoleSchema.parse(req.body);
    const role = await roleService.createRole(validatedData);

    res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: role,
    });
};

const getRoles = async (req, res) => {
    const roles = await roleService.getRoles();

    res.status(200).json({
        success: true,
        count: roles.length,
        data: roles,
    });
};

const getRoleById = async (req, res) => {
    const role = await roleService.getRoleById(req.params.id);

    res.status(200).json({
        success: true,
        data: role,
    });
};

const updateRole = async (req, res) => {
    const validatedData = updateRoleSchema.parse(req.body);
    const role = await roleService.updateRole(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Role updated successfully",
        data: role,
    });
};

const updateRoleState = async (req, res) => {
    const validatedData = updateRoleStateSchema.parse(req.body);
    const role = await roleService.updateRoleState(req.params.id, validatedData.state);

    res.status(200).json({
        success: true,
        message: "Role state updated successfully",
        data: role,
    });
};

const deleteRole = async (req, res) => {
    await roleService.deleteRole(req.params.id);

    res.status(200).json({
        success: true,
        message: "Role deleted successfully",
    });
};

module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    updateRoleState,
    deleteRole,
};
