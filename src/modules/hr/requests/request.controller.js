const service = require("./request.service");
const {
    createRequestSchema,
    updateRequestSchema,
} = require("./request.validation");

const createRequest = async (req, res) => {
    const validatedData = createRequestSchema.parse(req.body);
    const result = await service.createRequest(validatedData);

    res.status(201).json({
        success: true,
        message: "Request created successfully",
        data: result,
    });
};

const getRequests = async (req, res) => {
    const result = await service.getRequests();

    res.status(200).json({
        success: true,
        message: "Requests retrieved successfully",
        data: result,
    });
};

const getRequestById = async (req, res) => {
    const result = await service.getRequestById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Request details retrieved successfully",
        data: result,
    });
};

const updateRequest = async (req, res) => {
    const validatedData = updateRequestSchema.parse(req.body);
    const result = await service.updateRequest(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Request updated successfully",
        data: result,
    });
};

const deleteRequest = async (req, res) => {
    await service.deleteRequest(req.params.id);

    res.status(200).json({
        success: true,
        message: "Request deleted successfully",
    });
};

module.exports = {
    createRequest,
    getRequests,
    getRequestById,
    updateRequest,
    deleteRequest,
};
