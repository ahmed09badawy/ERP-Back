const setupService = require("./setup.service");

const bootstrapSystem = async (req, res) => {
    const result = await setupService.seedingSystem()

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = {
    bootstrapSystem,
};
