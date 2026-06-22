const allocationService = require("./allocation.service");
const {
    createAllocationSchema,
    updateAllocationSchema,
} = require("./allocation.validation");

const createAllocation = async (req, res) => {
    try {
        const validatedData = createAllocationSchema.parse(req.body);

        const allocation = await allocationService.createAllocation(validatedData);

        return res.status(201).json({
            success: true,
            message: "Allocation created successfully",
            data: allocation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllAllocations = async (req, res) => {
    try {
        const filters = {
            assetId: req.query.assetId,
        };

        const allocations = await allocationService.getAllAllocations(filters);

        return res.status(200).json({
            success: true,
            data: allocations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllocationById = async (req, res) => {
    try {
        const { id } = req.params;

        const allocation = await allocationService.getAllocationById(id);

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: allocation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateAllocation = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = updateAllocationSchema.parse(req.body);

        const allocation = await allocationService.updateAllocation(id, validatedData);

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Allocation updated successfully",
            data: allocation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteAllocation = async (req, res) => {
    try {
        const { id } = req.params;

        const allocation = await allocationService.deleteAllocation(id);

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Allocation deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createAllocation,
    getAllAllocations,
    getAllocationById,
    updateAllocation,
    deleteAllocation,
};
