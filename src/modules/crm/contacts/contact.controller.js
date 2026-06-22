const service = require("./contact.service");
const { parseExcel, genericImport } = require("../../../common/utils/excel");
const {
    createContactSchema,
    updateContactSchema,
} = require("./contact.validation");

const createContact = async (req, res) => {
    const validated = createContactSchema.parse(req.body);
    const result = await service.createContact(validated);

    res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: result,
    });
};

const importContacts = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Please upload an Excel file" });
    }

    // 1. Parse Excel to JSON
    const rawData = parseExcel(req.file.path);
    const results = await genericImport(
        rawData,
        service.createContact,
        createContactSchema
    );

    res.status(200).json({
        success: true,
        message: "Import process completed",
        data: results
    });
};

const getAllContacts = async (req, res) => {
    const { contacts, pagination } = await service.getAllContacts(req.query);

    res.status(200).json({
        success: true,
        data: contacts,
        pagination
    });
};

const getContactById = async (req, res) => {
    const result = await service.getContactById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateContact = async (req, res) => {
    const validated = updateContactSchema.parse(req.body);
    const result = await service.updateContact(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Contact updated successfully",
        data: result,
    });
};

const deleteContact = async (req, res) => {
    await service.deleteContact(req.params.id);

    res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
    });
};

module.exports = {
    createContact,
    importContacts,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
};
