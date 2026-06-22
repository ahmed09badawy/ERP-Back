const Role = require("../roles/role.model");
const Permission = require("../permissions/permission.model");
const RolePermission = require("../permissions/rolePermission.model");
const { SYSTEM_ROLES } = require("../../common/constants/roles");
const { ACTIONS } = require("../../common/constants/permissions");
const { SYSTEM_PERMISSION_MATRIX } = require("../../common/constants/systemPermission");

const seedingSystem = async () => {
    const defaultRoles = [
        { name: SYSTEM_ROLES.ADMIN, description: "System administrator" },
        { name: SYSTEM_ROLES.MANAGER, description: "Management role" },
        { name: SYSTEM_ROLES.HR, description: "Human resources role" },
        { name: SYSTEM_ROLES.ACCOUNTANT, description: "Accounting role" },
        { name: SYSTEM_ROLES.SALES, description: "Sales role" },
        { name: SYSTEM_ROLES.CASHIER, description: "Cashier role" },
    ];

    const createdRoles = [];

    for (const roleData of defaultRoles) {
        let role = await Role.findOne({ name: roleData.name });

        if (!role) {
            role = await Role.create(roleData);
        }

        createdRoles.push(role);
    }

    const createdPermissions = [];

    for (const moduleEntry of SYSTEM_PERMISSION_MATRIX) {
        for (const page of moduleEntry.pages) {
            for (const action of ACTIONS) {
                const existingPermission = await Permission.findOne({
                    module: moduleEntry.module,
                    page,
                    action,
                });

                if (!existingPermission) {
                    const permission = await Permission.create({
                        module: moduleEntry.module,
                        page,
                        action,
                    });

                    createdPermissions.push(permission);
                }
            }
        }
    }

    const adminRole = await Role.findOne({ name: SYSTEM_ROLES.ADMIN });

    if (adminRole) {
        for (const moduleEntry of SYSTEM_PERMISSION_MATRIX) {
            for (const page of moduleEntry.pages) {
                await RolePermission.findOneAndUpdate(
                    {
                        roleId: adminRole._id,
                        module: moduleEntry.module,
                        page,
                    },
                    {
                        roleId: adminRole._id,
                        module: moduleEntry.module,
                        page,
                        allowAll: true,
                        read: true,
                        add: true,
                        edit: true,
                        delete: true,
                    },
                    { upsert: true, returnDocument: "after" }
                );
            }
        }
    }

    return {
        rolesCount: createdRoles.length,
        newPermissionsCount: createdPermissions.length,
        message: "System seeding completed successfully",
    };
};

module.exports = {
    seedingSystem,
};
