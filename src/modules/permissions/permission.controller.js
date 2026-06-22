const permissionService = require("./permission.service");
const { setRolePermissionSchema } = require("./permission.validation");

const setRolePermission = async (req, res) => {
    const validatedData = setRolePermissionSchema.parse(req.body);
    const permission = await permissionService.setRolePermission(req.params.roleId, validatedData);

    res.status(200).json({
        success: true,
        message: "Role permission saved successfully",
        data: permission,
    });
};

const getRolePermissions = async (req, res) => {
    const permissions = await permissionService.getRolePermissions(req.params.roleId);

    res.status(200).json({
        success: true,
        message: "Role permissions retrieved successfully",
        data: permissions,
    });
};

const deleteRolePermission = async (req, res) => {
    await permissionService.deleteRolePermission(req.params.id);

    res.status(200).json({
        success: true,
        message: "Permission record deleted successfully",
    });
};

module.exports = {
    setRolePermission,
    getRolePermissions,
    deleteRolePermission,
};
