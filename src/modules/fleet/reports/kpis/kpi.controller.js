const service = require("./kpi.service");

const getFleetKPIs = async (req, res) => {
    const result = await service.getFleetKPIs();

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = {
    getFleetKPIs,
};
