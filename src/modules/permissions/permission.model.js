const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
    {
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
        action: {
            type: String,
            enum: ["read", "add", "edit", "delete"],
            required: true,
        },
    },
    { timestamps: true }
);

permissionSchema.index({ module: 1, page: 1, action: 1 }, { unique: true });

module.exports = mongoose.model("Permission", permissionSchema);
