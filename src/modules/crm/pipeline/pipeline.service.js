const Pipeline = require("./pipeline.model");
const Counter = require("../../assets/counter.model");

const generatePipelineCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "pipeline" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `PL-${String(counter.seq).padStart(4, "0")}`;
};

const createPipeline = async (data) => {
    data.pipelineCode = await generatePipelineCode();
    return await Pipeline.create(data);
};

const getAllPipelines = async (query) => {
    const { page = 1, limit = 10 } = query;

    const pipelines = await Pipeline.find({ isDeleted: false })
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

    return pipelines;
};

const getPipelineById = async (id) => {
    return await Pipeline.findById(id);
};

const updatePipeline = async (id, data) => {
    return await Pipeline.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

const deletePipeline = async (id) => {
    return await Pipeline.findByIdAndUpdate(id, { isDeleted: true });
};

module.exports = {
    createPipeline,
    getAllPipelines,
    getPipelineById,
    updatePipeline,
    deletePipeline,
};
