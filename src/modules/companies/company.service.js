const Company = require("./company.model");
const generateCode = require("../../common/utils/generate-code");

const createCompany = async ({ name, taxNumber, email, defaultCurrency }) => {
    const companyCode = await generateCode("company", "COM");

    const company = await Company.create({
        companyCode,
        name,
        taxNumber,
        email: email || "",
        defaultCurrency: defaultCurrency?.toUpperCase() || "EGP",
    });

    return company;
};

const getCompanies = async () => {
    return Company.find().sort({ createdAt: -1 });
};

const getCompanyById = async (id) => {
    const company = await Company.findById(id);
    if (!company) {
        const error = new Error("Company not found");
        error.statusCode = 404;
        throw error;
    }

    return company;
};

const updateCompany = async (id, payload) => {
    const company = await Company.findById(id);
    if (!company) {
        const error = new Error("Company not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.name) company.name = payload.name;
    if (payload.taxNumber !== undefined) company.taxNumber = payload.taxNumber;
    if (payload.email !== undefined) company.email = payload.email;
    if (payload.defaultCurrency) company.defaultCurrency = payload.defaultCurrency.toUpperCase();

    await company.save();
    return company;
};

const deleteCompany = async (id) => {
    const company = await Company.findById(id);
    if (!company) {
        const error = new Error("Company not found");
        error.statusCode = 404;
        throw error;
    }

    await company.deleteOne();
    return { message: "Company deleted successfully" };
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
};
