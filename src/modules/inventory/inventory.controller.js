const inventoryService = require("./inventory.service");
const {
    createInventorySchema,
    updateInventorySchema,
} = require("./inventory.validation");

const createInventory = async (req, res) => {
    const validatedData = createInventorySchema.parse(req.body);
    const item = await inventoryService.createInventory(validatedData);

    res.status(201).json({
        success: true,
        message: "Inventory item created successfully",
        data: item,
    });
};

const getInventories = async (req, res) => {
    const items = await inventoryService.getInventories();

    res.status(200).json({
        success: true,
        message: "Inventory items retrieved successfully",
        data: items,
    });
};

const getInventoryById = async (req, res) => {
    const item = await inventoryService.getInventoryById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Inventory item details retrieved successfully",
        data: item,
    });
};

const updateInventory = async (req, res) => {
    const validatedData = updateInventorySchema.parse(req.body);
    const item = await inventoryService.updateInventory(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Inventory item updated successfully",
        data: item,
    });
};

const deleteInventory = async (req, res) => {
    await inventoryService.deleteInventory(req.params.id);

    res.status(200).json({
        success: true,
        message: "Inventory item deleted successfully",
    });
};

module.exports = {
    createInventory,
    getInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
};
