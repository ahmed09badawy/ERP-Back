const RolePermission = require("../modules/permissions/rolePermission.model");

const permissionMiddleware = (moduleName, pageName, action) => {
    return async (req, res, next) => {
        const user = req.user;

        if (!user || !user.roleId?._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        if (user.roleId.name === "ADMIN") {
            return next();
        }

        const permission = await RolePermission.findOne({
            roleId: user.roleId._id,
            module: moduleName.toLowerCase(),
            page: pageName.toLowerCase(),
        });

        if (!permission) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: No permissions defined for ${moduleName}/${pageName}`,
            });
        }

        if (permission.allowAll) {
            return next();
        }
        const actionsToCheck = Array.isArray(action) ? action : [action];
        const hasPermission = actionsToCheck.some((act) => permission[act.toLowerCase()] === true);

        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: missing ${action} permission on ${moduleName}/${pageName}`,
            });
        }

        next();
    };
};

module.exports = permissionMiddleware;
