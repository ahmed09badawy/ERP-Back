const service = require("./salesSettings.service");

const getSettings = async (req, res) => {
    const data = await service.getSettings();

    res.status(200).json({
        success: true,
        data,
    });
};

const updateSettings = async (req, res) => {
    const data = await service.updateSettings(req.body);

    res.status(200).json({
        success: true,
        message: "Sales settings updated successfully",
        data,
    });
};

module.exports = {
    getSettings,
    updateSettings,
};
