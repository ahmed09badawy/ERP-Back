const Depreciation = require("./depreciation.model");
const Counter = require("../counter.model")
const generateCode = require("../../../common/utils/generate-code");
const createDepreciation = async (data) => {
    const depreciationCode = await generateCode("depreciation", "DEP");
    const depreciation = await Depreciation.create({
        ...data,
        depreciationCode,
    });

    return depreciation;
};

const getAllDepreciations = async (filters) => {
    const query = {};

    if (filters.assetId) {
        query.assetId = filters.assetId;
    }

    const data = await Depreciation.find(query)
        .populate("assetId", "assetName serialNumber category")
        .sort({ createdAt: -1 });

    return data;
};

const getDepreciationById = async (id) => {
    return await Depreciation.findById(id).populate(
        "assetId",
        "assetName serialNumber category"
    );
};

const updateDepreciation = async (id, data) => {
    return await Depreciation.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    }).populate("assetId", "assetName serialNumber category");
};

const deleteDepreciation = async (id) => {
    return await Depreciation.findByIdAndDelete(id);
};

module.exports = {
    createDepreciation,
    getAllDepreciations,
    getDepreciationById,
    updateDepreciation,
    deleteDepreciation,
};
