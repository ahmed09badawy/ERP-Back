const disposalService = require("./disposal.service");
const {
    createDisposalSchema,
    updateDisposalSchema,
} = require("./disposal.validation");

const createDisposal = async (req, res) => {
    try {
        const validatedData = createDisposalSchema.parse(req.body);

        const disposal = await disposalService.createDisposal(validatedData);

        return res.status(201).json({
            success: true,
            message: "Disposal created successfully",
            data: disposal,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllDisposals = async (req, res) => {
    try {
        const filters = {
            assetId: req.query.assetId,
            disposalType: req.query.disposalType,
        };

        const disposals = await disposalService.getAllDisposals(filters);

        return res.status(200).json({
            success: true,
            data: disposals,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDisposalById = async (req, res) => {
    try {
        const { id } = req.params;

        const disposal = await disposalService.getDisposalById(id);

        if (!disposal) {
            return res.status(404).json({
                success: false,
                message: "Disposal not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: disposal,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateDisposal = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = updateDisposalSchema.parse(req.body);

        const disposal = await disposalService.updateDisposal(id, validatedData);

        if (!disposal) {
            return res.status(404).json({
                success: false,
                message: "Disposal not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Disposal updated successfully",
            data: disposal,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteDisposal = async (req, res) => {
    try {
        const { id } = req.params;

        const disposal = await disposalService.deleteDisposal(id);

        if (!disposal) {
            return res.status(404).json({
                success: false,
                message: "Disposal not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Disposal deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createDisposal,
    getAllDisposals,
    getDisposalById,
    updateDisposal,
    deleteDisposal,
};
