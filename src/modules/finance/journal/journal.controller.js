const service = require("./journal.service");
const {
    createJournalSchema,
    updateJournalSchema,
} = require("./journal.validation");

const createJournal = async (req, res) => {
    const validated = createJournalSchema.parse(req.body);
    const result = await service.createJournal(validated);

    res.status(201).json({ success: true, data: result });
};

const getAllJournal = async (req, res) => {
    const result = await service.getAllJournal();
    res.status(200).json({ success: true, data: result });
};

const getJournalById = async (req, res) => {
    const result = await service.getJournalById(req.params.id);
    res.status(200).json({ success: true, data: result });
};

const updateJournal = async (req, res) => {
    const validated = updateJournalSchema.parse(req.body);
    const result = await service.updateJournal(req.params.id, validated);
    res.status(200).json({ success: true, data: result });
};

const deleteJournal = async (req, res) => {
    const result = await service.deleteJournal(req.params.id);
    res.status(200).json({ success: true, ...result });
};

module.exports = {
    createJournal,
    getAllJournal,
    getJournalById,
    updateJournal,
    deleteJournal,
};
