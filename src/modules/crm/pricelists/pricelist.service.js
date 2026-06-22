const Pricelist = require("./pricelist.model");

const createPricelist = async (payload) => {
    return await Pricelist.create(payload);
};

const getAllPricelists = async (query = {}) => {
    const filter = { isDeleted: false };
    if (query.name) {
        filter.name = { $regex: query.name, $options: "i" };
    }
    return await Pricelist.find(filter)
        .populate("currencyId")
        .populate("items.productId")
        .sort({ name: 1 });
};

const getPricelistById = async (id) => {
    const pricelist = await Pricelist.findOne({ _id: id, isDeleted: false })
        .populate("currencyId")
        .populate("items.productId");
    if (!pricelist) {
        const error = new Error("Pricelist not found");
        error.statusCode = 404;
        throw error;
    }
    return pricelist;
};

const updatePricelist = async (id, payload) => {
    const pricelist = await Pricelist.findOneAndUpdate(
        { _id: id, isDeleted: false },
        payload,
        { returnDocument: "after" }
    );
    if (!pricelist) {
        const error = new Error("Pricelist not found");
        error.statusCode = 404;
        throw error;
    }
    return pricelist;
};

const deletePricelist = async (id) => {
    const pricelist = await Pricelist.findOneAndUpdate(
        { _id: id },
        { isDeleted: true },
        { returnDocument: "after" }
    );
    if (!pricelist) {
        const error = new Error("Pricelist not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Pricelist deleted successfully" };
};

module.exports = {
    createPricelist,
    getAllPricelists,
    getPricelistById,
    updatePricelist,
    deletePricelist,
};
