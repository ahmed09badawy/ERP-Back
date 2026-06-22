const userService = require("./user.service");
const {
    createUserSchema,
    updateUserSchema,
    updateUserStateSchema,
} = require("./user.validation");

const createUser = async (req, res) => {
    const validatedData = createUserSchema.parse(req.body);
    const user = await userService.createUser(validatedData);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
    });
};

const getUsers = async (req, res) => {
    const users = await userService.getUsers();

    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    res.status(200).json({
        success: true,
        data: user,
    });
};

const updateUser = async (req, res) => {
    const validatedData = updateUserSchema.parse(req.body);
    const user = await userService.updateUser(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
    });
};

const updateUserState = async (req, res) => {
    const validatedData = updateUserStateSchema.parse(req.body);
    const user = await userService.updateUserState(req.params.id, validatedData.state);

    res.status(200).json({
        success: true,
        message: "User state updated successfully",
        data: user,
    });
};

const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    updateUserState,
    deleteUser,
};
