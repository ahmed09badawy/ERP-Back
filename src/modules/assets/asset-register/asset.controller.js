const assetService = require("./asset.service");
const {
    createAssetSchema,
    updateAssetSchema,
} = require("./asset.validation");

const createAsset = async (req, res) => {
    try {
        const validatedData = createAssetSchema.parse(req.body);

        const asset = await assetService.createAsset(validatedData);

        return res.status(201).json({
            success: true,
            message: "Asset created successfully",
            data: asset,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllAssets = async (req, res) => {
    try {
        const assets = await assetService.getAllAssets();

        return res.status(200).json({
            success: true,
            data: assets,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAssetById = async (req, res) => {
    try {
        const { id } = req.params;

        const asset = await assetService.getAssetById(id);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: asset,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = updateAssetSchema.parse(req.body);

        const asset = await assetService.updateAsset(id, validatedData);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Asset updated successfully",
            data: asset,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;

        const asset = await assetService.deleteAsset(id);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Asset deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset,
};
