const service = require("./dashboard.service");

const getFleetDashboard = async (req, res) => {
    const period = req.query.period || "this_month";

    const result = await service.getFleetDashboard(period);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = {
    getFleetDashboard,
};
