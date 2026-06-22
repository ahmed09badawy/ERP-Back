const service = require("./endOfService.service");
const {
    createEndOfServiceSchema,
    updateEndOfServiceSchema,
} = require("./endOfService.validation");

const createEndOfService = async (req, res) => {
    const validated = createEndOfServiceSchema.parse(req.body);
    const result = await service.createEndOfService(validated);

    res.status(201).json({
        success: true,
        message: "End of service created successfully",
        data: result,
    });
};

const getAllEndOfServices = async (req, res) => {
    const result = await service.getAllEndOfServices(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getEndOfServiceById = async (req, res) => {
    const result = await service.getEndOfServiceById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateEndOfService = async (req, res) => {
    const validated = updateEndOfServiceSchema.parse(req.body);
    const result = await service.updateEndOfService(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "End of service updated successfully",
        data: result,
    });
};

const deleteEndOfService = async (req, res) => {
    await service.deleteEndOfService(req.params.id);

    res.status(200).json({
        success: true,
        message: "End of service deleted successfully",
    });
};

module.exports = {
    createEndOfService,
    getAllEndOfServices,
    getEndOfServiceById,
    updateEndOfService,
    deleteEndOfService,
};
