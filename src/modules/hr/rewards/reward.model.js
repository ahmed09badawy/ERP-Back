const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
    {
        employeeInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        rewardsId: {
            type: String,
            unique: true,
            trim: true,
        },

        rewardsType: {
            type: String,
            enum: ["Performance Bonus", "Spot Reward", "Incentive Scheme", "Annual Bonus", "Other"],
            required: true,
        },

        rewardDate: {
            type: Date,
            required: true,
        },

        rewardAmount: {
            type: Number,
            required: true,
        },

        bonus: {
            type: Number,
            default: 0,
        },

        commissions: {
            type: Number,
            default: 0,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Reward", rewardSchema);
