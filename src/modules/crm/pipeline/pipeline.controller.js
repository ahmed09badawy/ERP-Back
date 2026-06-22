const service = require("./pipeline.service");
const {
    createPipelineSchema,
    updatePipelineSchema,
} = require("./pipeline.validation");

const createPipeline = async (req, res) => {
    const validated = createPipelineSchema.parse(req.body);
    const result = await service.createPipeline(validated);

    res.status(201).json({
        success: true,
        message: "Pipeline created successfully",
        data: result,
    });
};

const getAllPipelines = async (req, res) => {
    const result = await service.getAllPipelines(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getPipelineById = async (req, res) => {
    const result = await service.getPipelineById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updatePipeline = async (req, res) => {
    const validated = updatePipelineSchema.parse(req.body);
    const result = await service.updatePipeline(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Pipeline updated successfully",
        data: result,
    });
};

const deletePipeline = async (req, res) => {
    await service.deletePipeline(req.params.id);

    res.status(200).json({
        success: true,
        message: "Pipeline deleted successfully",
    });
};

module.exports = {
    createPipeline,
    getAllPipelines,
    getPipelineById,
    updatePipeline,
    deletePipeline,
};
