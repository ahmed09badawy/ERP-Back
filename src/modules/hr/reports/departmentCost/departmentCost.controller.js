const service = require("./departmentCost.service");

const getDepartmentCostReport = async (req, res) => {
    const result = await service.getDepartmentCostReport(req.query);

    res.status(200).json({
        success: true,
        data: result,
    });
};

module.exports = { getDepartmentCostReport };
