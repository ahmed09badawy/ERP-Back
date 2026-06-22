const service = require("./response.service");

const getResponses = async (req, res) => {
    const { type } = req.query;

    const result = await service.getResponses(type);

    res.status(200).json({
        success: true,
        message: "Responses retrieved successfully",
        count: result.length,
        data: result,
    });
};

const getResponseDetails = async (req, res) => {
    const { module, id } = req.params;

    const result = await service.getResponseDetails(module, id);

    res.status(200).json({
        success: true,
        message: "Response details retrieved successfully",
        data: result,
    });
};

module.exports = {
    getResponses,
    getResponseDetails,
};
