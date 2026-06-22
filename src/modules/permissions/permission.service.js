const Role = require("../roles/role.model");
const RolePermission = require("./rolePermission.model");

const setRolePermission = async (roleId, payload) => {
    const role = await Role.findById(roleId);
    if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
    }

    let permissionPayload = {
        module: payload.module.toLowerCase(),
        page: payload.page.toLowerCase(),
        allowAll: payload.allowAll,
        read: payload.read,
        add: payload.add,
        edit: payload.edit,
        delete: payload.delete,
    };

    if (permissionPayload.allowAll) {
        permissionPayload.read = true;
        permissionPayload.add = true;
        permissionPayload.edit = true;
        permissionPayload.delete = true;
    }

    const permission = await RolePermission.findOneAndUpdate(
        {
            roleId,
            module: permissionPayload.module,
            page: permissionPayload.page,
        },
        {
            roleId,
            ...permissionPayload,
        },
        { upsert: true, returnDocument: "after" }
    );

    return permission;
};

const getRolePermissions = async (roleId) => {
    const role = await Role.findById(roleId);
    if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
    }

    return RolePermission.find({ roleId }).sort({ module: 1, page: 1 });
};

const deleteRolePermission = async (id) => {
    const permission = await RolePermission.findByIdAndDelete(id);
    if (!permission) {
        const error = new Error("Permission record not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Permission record deleted successfully" };
};

module.exports = {
    setRolePermission,
    getRolePermissions,
    deleteRolePermission,
};
