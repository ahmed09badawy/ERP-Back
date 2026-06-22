const service = require("./group.service");
const { createGroupSchema, updateGroupSchema } = require("./group.validation");

const createGroup = async (req, res) => {
    const validated = createGroupSchema.parse(req.body);
    const result = await service.createGroup(validated);
    res.status(201).json({ success: true, data: result });
};

const getAllGroups = async (req, res) => {
    const result = await service.getAllGroups(req.query);
    res.status(200).json({ success: true, data: result });
};

const getGroupById = async (req, res) => {
    const result = await service.getGroupById(req.params.id);
    res.status(200).json({ success: true, data: result });
};

const updateGroup = async (req, res) => {
    const validated = updateGroupSchema.parse(req.body);
    const result = await service.updateGroup(req.params.id, validated);
    res.status(200).json({ success: true, data: result });
};

const deleteGroup = async (req, res) => {
    const result = await service.deleteGroup(req.params.id);
    res.status(200).json({ success: true, ...result });
};

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
};
