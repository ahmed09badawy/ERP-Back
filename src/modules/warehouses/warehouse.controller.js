const warehouseService = require("./warehouse.service");
const {
    createWarehouseSchema,
    updateWarehouseSchema,
    updateWarehouseStateSchema,
} = require("./warehouse.validation");

const createWarehouse = async (req, res) => {
    const validatedData = createWarehouseSchema.parse(req.body);
    const warehouse = await warehouseService.createWarehouse(validatedData);

    res.status(201).json({
        success: true,
        message: "Warehouse created successfully",
        data: warehouse,
    });
};

const getWarehouses = async (req, res) => {
    const warehouses = await warehouseService.getWarehouses();

    res.status(200).json({
        success: true,
        count: warehouses.length,
        data: warehouses,
    });
};

const getWarehouseById = async (req, res) => {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);

    res.status(200).json({
        success: true,
        data: warehouse,
    });
};

const updateWarehouse = async (req, res) => {
    const validatedData = updateWarehouseSchema.parse(req.body);
    const warehouse = await warehouseService.updateWarehouse(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Warehouse updated successfully",
        data: warehouse,
    });
};

const updateWarehouseState = async (req, res) => {
    const validatedData = updateWarehouseStateSchema.parse(req.body);
    const warehouse = await warehouseService.updateWarehouseState(
        req.params.id,
        validatedData.state
    );

    res.status(200).json({
        success: true,
        message: "Warehouse state updated successfully",
        data: warehouse,
    });
};

const deleteWarehouse = async (req, res) => {
    await warehouseService.deleteWarehouse(req.params.id);

    res.status(200).json({
        success: true,
        message: "Warehouse deleted successfully",
    });
};

module.exports = {
    createWarehouse,
    getWarehouses,
    getWarehouseById,
    updateWarehouse,
    updateWarehouseState,
    deleteWarehouse,
};
