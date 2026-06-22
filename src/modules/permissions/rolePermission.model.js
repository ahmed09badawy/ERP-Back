const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema(
    {
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        module: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        page: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        allowAll: {
            type: Boolean,
            default: false,
        },
        read: {
            type: Boolean,
            default: false,
        },
        add: {
            type: Boolean,
            default: false,
        },
        edit: {
            type: Boolean,
            default: false,
        },
        delete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

rolePermissionSchema.index({ roleId: 1, module: 1, page: 1 }, { unique: true });

module.exports = mongoose.model("RolePermission", rolePermissionSchema);
