const authService = require("./auth.service");
const { registerAdminSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require("./auth.validation");

const registerAdmin = async (req, res) => {
    const validatedData = registerAdminSchema.parse(req.body);
    const result = await authService.registerAdmin(validatedData);

    res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        data: result,
    });
};

const login = async (req, res) => {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    });
};

const me = async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
};

const forgotPassword = async (req, res) => {
    const validatedData = forgotPasswordSchema.parse(req.body);
    await authService.forgotPassword(validatedData.email);

    res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
    });
};

const resetPassword = async (req, res) => {
    const validatedData = resetPasswordSchema.parse(req.body);
    const result = await authService.resetPassword(req.params.token, validatedData.newPassword);

    res.status(200).json({
        success: true,
        message: result.message,
    });
};

const logout = async (req, res) => {
    // In a stateless JWT setup, logout is primarily handled by the client
    // by deleting the token. We return a success message here.
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

module.exports = {
    registerAdmin,
    login,
    me,
    forgotPassword,
    resetPassword,
    logout,
};
