const Role = require("./role.model");

const createRole = async ({ name, description }) => {
    const existingRole = await Role.findOne({ name: name.toUpperCase() });

    if (existingRole) {
        const error = new Error("Role already exists");
        error.statusCode = 400;
        throw error;
    }

    return Role.create({
        name: name.toUpperCase(),
        description,
    });
};

const getRoles = async () => {
    return Role.find().sort({ createdAt: -1 });
};

const getRoleById = async (id) => {
    const role = await Role.findById(id);

    if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
    }

    return role;
};

const updateRole = async (id, payload) => {
    const role = await Role.findById(id);

    if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.name) {
        const existingRole = await Role.findOne({
            name: payload.name.toUpperCase(),
            _id: { $ne: id },
        });

        if (existingRole) {
            const error = new Error("Role already exists");
            error.statusCode = 400;
            throw error;
        }

        role.name = payload.name.toUpperCase();
    }

    if (payload.description !== undefined) role.description = payload.description;
    if (payload.state !== undefined) role.state = payload.state;

    await role.save();

    return role;
};

const updateRoleState = async (id, state) => {
    const role = await Role.findById(id);

    if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
    }

    role.state = state;
    await role.save();

    return role;
};

const deleteRole = async (id) => {
    const role = await Role.findById(id);

    if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
    }

    await Role.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    updateRoleState,
    deleteRole,
};
