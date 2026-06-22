const service = require("./lead.service");
const {
    createLeadSchema,
    updateLeadSchema,
} = require("./lead.validation");

const createLead = async (req, res) => {
    const validated = createLeadSchema.parse(req.body);
    const result = await service.createLead(validated);

    res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: result,
    });
};

const getAllLeads = async (req, res) => {
    const result = await service.getAllLeads(req.query);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result,
    });
};

const getLeadById = async (req, res) => {
    const result = await service.getLeadById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateLead = async (req, res) => {
    const validated = updateLeadSchema.parse(req.body);
    const result = await service.updateLead(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: result,
    });
};

const deleteLead = async (req, res) => {
    await service.deleteLead(req.params.id);

    res.status(200).json({
        success: true,
        message: "Lead deleted successfully",
    });
};

module.exports = {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
};
