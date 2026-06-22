const { z } = require("zod");

const setRolePermissionSchema = z.object({
    module: z.string().min(1),
    page: z.string().min(1),
    allowAll: z.boolean().optional().default(false),
    read: z.boolean().optional().default(false),
    add: z.boolean().optional().default(false),
    edit: z.boolean().optional().default(false),
    delete: z.boolean().optional().default(false),
});

module.exports = {
    setRolePermissionSchema,
};
