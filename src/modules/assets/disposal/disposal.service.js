const Disposal = require("./disposal.model");
const Asset = require("../asset-register/asset.model");
const Counter = require("../counter.model");
const generateCode = require("../../../common/utils/generate-code");

const createDisposal = async (data) => {
    const disposalCode = await generateCode("disposal", "DIS");
    const asset = await Asset.findById(data.assetId);

    if (!asset) {
        throw new Error("Asset not found");
    }

    const disposal = await Disposal.create({
        ...data,
        disposalCode,
        assetName: asset.assetName,
        model: asset.model,
        serialNumber: asset.serialNumber,
        brand: asset.brand,
        category: asset.category,
    });

    return disposal;
};

const getAllDisposals = async (filters) => {
    const query = {};

    if (filters.assetId) {
        query.assetId = filters.assetId;
    }

    if (filters.disposalType) {
        query.disposalType = filters.disposalType;
    }

    const disposals = await Disposal.find(query)
        .populate("assetId", "assetCode assetName serialNumber category location")
        .sort({ createdAt: -1 });

    return disposals;
};

const getDisposalById = async (id) => {
    const disposal = await Disposal.findById(id).populate(
        "assetId",
        "assetCode assetName serialNumber category location"
    );

    return disposal;
};

const updateDisposal = async (id, data) => {
    let updatedData = { ...data };

    if (data.assetId) {
        const asset = await Asset.findById(data.assetId);

        if (!asset) {
            throw new Error("Asset not found");
        }

        updatedData.assetName = asset.assetName;
        updatedData.model = asset.model;
        updatedData.serialNumber = asset.serialNumber;
        updatedData.brand = asset.brand;
        updatedData.category = asset.category;
    }

    const disposal = await Disposal.findByIdAndUpdate(id, updatedData, {
        returnDocument: "after",
        runValidators: true,
    }).populate("assetId", "assetCode assetName serialNumber category location");

    return disposal;
};

const deleteDisposal = async (id) => {
    const disposal = await Disposal.findByIdAndDelete(id);
    return disposal;
};

module.exports = {
    createDisposal,
    getAllDisposals,
    getDisposalById,
    updateDisposal,
    deleteDisposal,
};
