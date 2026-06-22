const mongoose = require("mongoose");

const pipelineSchema = new mongoose.Schema(
    {
        pipelineCode: {
            type: String,
            unique: true,
        },

        pipelineName: {
            type: String,
            required: true,
            trim: true,
        },

        totalDealValue: {
            type: Number,
            required: true,
        },

        numberOfDeals: {
            type: Number,
            required: true,
        },

        stage: {
            type: String,
            enum: ["Win", "Lost", "In Pipeline"],
            default: "In Pipeline",
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

module.exports = mongoose.model("Pipeline", pipelineSchema);
