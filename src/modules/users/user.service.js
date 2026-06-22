const User = require("./user.model");
const Role = require("../roles/role.model");
const { hashPassword } = require("../../common/utils/hash");

const createUser = async ({ username, email, password, roleId, companyId, branchId }) => {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 400;
        throw error;
    }

    const role = await Role.findById(roleId);

    if (!role || role.state !== "ACTIVE") {
        const error = new Error("Invalid or inactive role");
        error.statusCode = 400;
        throw error;
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
        username,
        email: email.toLowerCase(),
        passwordHash,
        roleId,
        companyId: companyId || null,
        branchId: branchId || null,
    });

    return User.findById(user._id).select("-passwordHash").populate("roleId companyId branchId");
};

const getUsers = async () => {
    return User.find()
        .select("-passwordHash")
        .populate("roleId companyId branchId")
        .sort({ createdAt: -1 });
};

const getUserById = async (id) => {
    const user = await User.findById(id)
        .select("-passwordHash")
        .populate("roleId companyId branchId");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

const updateUser = async (id, payload) => {
    const user = await User.findById(id);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.email) {
        const existingEmail = await User.findOne({
            email: payload.email.toLowerCase(),
            _id: { $ne: id },
        });

        if (existingEmail) {
            const error = new Error("Email already exists");
            error.statusCode = 400;
            throw error;
        }

        user.email = payload.email.toLowerCase();
    }

    if (payload.roleId) {
        const role = await Role.findById(payload.roleId);

        if (!role || role.state !== "ACTIVE") {
            const error = new Error("Invalid or inactive role");
            error.statusCode = 400;
            throw error;
        }

        user.roleId = payload.roleId;
    }

    if (payload.username !== undefined) user.username = payload.username;
    if (payload.companyId !== undefined) user.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) user.branchId = payload.branchId || null;
    if (payload.state !== undefined) user.state = payload.state;

    await user.save();

    return User.findById(user._id).select("-passwordHash").populate("roleId companyId branchId");
};

const updateUserState = async (id, state) => {
    const user = await User.findById(id);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    user.state = state;
    await user.save();

    return User.findById(user._id).select("-passwordHash").populate("roleId companyId branchId");
};

const deleteUser = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    await User.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    updateUserState,
    deleteUser,
};
