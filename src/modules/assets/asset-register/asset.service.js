const Asset = require("./asset.model");
const Counter = require("../counter.model")
const generateCode = require("../../../common/utils/generate-code");
const createAsset = async (data) => {
    const assetCode = await generateCode("register", "REG");
    const asset = await Asset.create({
        ...data,
        assetCode,
        code: assetCode,
    });
    return asset;
};
const getAllAssets = async () => {
    const assets = await Asset.find().sort({ createdAt: -1 });
    return assets;
};

const getAssetById = async (id) => {
    const asset = await Asset.findById(id);
    return asset;
};

const updateAsset = async (id, data) => {
    const asset = await Asset.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });
    return asset;
};

const deleteAsset = async (id) => {
    const asset = await Asset.findByIdAndDelete(id);
    return asset;
};


const generateAssetCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "asset" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    const number = counter.seq.toString().padStart(4, "0");

    return `AST-${number}`;
};

module.exports = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset,
};
