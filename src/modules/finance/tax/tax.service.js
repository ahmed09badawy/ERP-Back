const Tax = require("./tax.model");

const createTax = async (payload) => {
    const existing = await Tax.findOne({
        taxCode: payload.taxCode.toUpperCase(),
    });

    if (existing) {
        const error = new Error("Tax code already exists");
        error.statusCode = 400;
        throw error;
    }

    return Tax.create({
        ...payload,
        taxCode: payload.taxCode.toUpperCase(),
    });
};

const getAllTaxes = async () => {
    return Tax.find().sort({ createdAt: -1 });
};

const getTaxById = async (id) => {
    const tax = await Tax.findById(id);

    if (!tax) {
        const error = new Error("Tax not found");
        error.statusCode = 404;
        throw error;
    }

    return tax;
};

const updateTax = async (id, payload) => {
    const tax = await Tax.findById(id);

    if (!tax) {
        const error = new Error("Tax not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(tax, payload);

    if (payload.taxCode) {
        tax.taxCode = payload.taxCode.toUpperCase();
    }

    await tax.save();
    return tax;
};

const deleteTax = async (id) => {
    const tax = await Tax.findById(id);

    if (!tax) {
        const error = new Error("Tax not found");
        error.statusCode = 404;
        throw error;
    }

    await Tax.findByIdAndDelete(id);

    return { message: "Tax deleted successfully" };
};

module.exports = {
    createTax,
    getAllTaxes,
    getTaxById,
    updateTax,
    deleteTax,
};
