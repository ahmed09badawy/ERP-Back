const User = require("../users/user.model");
const Role = require("../roles/role.model");
const generateToken = require("../../common/utils/generateToken");
const { hashPassword, comparePassword } = require("../../common/utils/hash");
const { SYSTEM_ROLES } = require("../../common/constants/roles");
const crypto = require("crypto");
const sendEmail = require("../../common/utils/email");

const registerAdmin = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 400;
        throw error;
    }

    let adminRole = await Role.findOne({ name: SYSTEM_ROLES.ADMIN });

    if (!adminRole) {
        adminRole = await Role.create({
            name: SYSTEM_ROLES.ADMIN,
            description: "System administrator",
        });
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
        username,
        email: email.toLowerCase(),
        passwordHash,
        roleId: adminRole._id,
    });

    const token = generateToken({
        userId: user._id,
        email: user.email,
    });

    return { user, token };
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email: email.toLowerCase() }).populate("roleId");

    if (!user) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    if (user.state !== "ACTIVE") {
        const error = new Error("User is inactive");
        error.statusCode = 403;
        throw error;
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken({
        userId: user._id,
        email: user.email,
    });

    return { user, token };
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        const error = new Error("User with this email does not exist");
        error.statusCode = 404;
        throw error;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
        <h1>You requested a password reset</h1>
        <p>Please click on the following link to reset your password:</p>
        <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
    `;

    try {
        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            html: message,
        });
    } catch (error) {
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        const mailError = new Error("Email could not be sent");
        mailError.statusCode = 500;
        throw mailError;
    }

    return { message: "Email sent" };
};

const resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        const error = new Error("Invalid or expired reset token");
        error.statusCode = 400;
        throw error;
    }

    user.passwordHash = await hashPassword(newPassword);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return { message: "Password reset successful" };
};

module.exports = {
    registerAdmin,
    login,
    forgotPassword,
    resetPassword,
};
