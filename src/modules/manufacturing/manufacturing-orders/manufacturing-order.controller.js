const service = require("./manufacturing-order.service");
const {
    createManufacturingOrderSchema,
    updateManufacturingOrderSchema,
} = require("./manufacturing-order.validation");    

const createManufacturingOrder = async (req, res) => {
    try {
        const validated = createManufacturingOrderSchema.parse(req.body);

        const result = await service.createManufacturingOrder(validated);

        res.status(201).json({
            success: true,
            message: "Manufacturing Order created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllManufacturingOrders = async (req, res) => {
    try {
        const result = await service.getAllManufacturingOrders(req.query);

        res.status(200).json({
            success: true,
            message: "Manufacturing Orders fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getManufacturingOrderById = async (req, res) => {
    try {
        const result = await service.getManufacturingOrderById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Manufacturing Order fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateManufacturingOrder = async (req, res) => {
    try {
        const validated = updateManufacturingOrderSchema.parse(req.body);

        const result = await service.updateManufacturingOrder(
            req.params.id,
            validated
        );

        res.status(200).json({
            success: true,
            message: "Manufacturing Order updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteManufacturingOrder = async (req, res) => {
    try {
        await service.deleteManufacturingOrder(req.params.id);

        res.status(200).json({
            success: true,
            message: "Manufacturing Order deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createManufacturingOrder,
    getAllManufacturingOrders,
    getManufacturingOrderById,
    updateManufacturingOrder,
    deleteManufacturingOrder,
};
