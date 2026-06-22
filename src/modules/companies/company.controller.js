const companyService = require("./company.service");
const { createCompanySchema, updateCompanySchema } = require("./company.validation");

const createCompany = async (req, res) => {
    const validatedData = createCompanySchema.parse(req.body);
    const company = await companyService.createCompany(validatedData);

    res.status(201).json({
        success: true,
        message: "Company created successfully",
        data: company,
    });
};

const getCompanies = async (req, res) => {
    const companies = await companyService.getCompanies();

    res.status(200).json({
        success: true,
        data: companies,
    });
};

const getCompanyById = async (req, res) => {
    const company = await companyService.getCompanyById(req.params.id);

    res.status(200).json({
        success: true,
        data: company,
    });
};

const updateCompany = async (req, res) => {
    const validatedData = updateCompanySchema.parse(req.body);
    const company = await companyService.updateCompany(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Company updated successfully",
        data: company,
    });
};

const deleteCompany = async (req, res) => {
    await companyService.deleteCompany(req.params.id);

    res.status(200).json({
        success: true,
        message: "Company deleted successfully",
    });
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
};
