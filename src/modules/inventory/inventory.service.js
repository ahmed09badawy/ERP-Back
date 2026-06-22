const Inventory = require("./inventory.model");
const generateCode = require("../../common/utils/generate-code");

const createInventory = async (payload) => {
    const inventoryCode = await generateCode("inventory", "INV");

    const item = await Inventory.create({
        ...payload,
        customerCode: inventoryCode,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
    });

    return Inventory.findById(item._id).populate("companyId branchId");
};

const getInventories = async () => {
    return Inventory.find()
        .populate("companyId branchId")
        .sort({ createdAt: -1 });
};

const getInventoryById = async (id) => {
    const item = await Inventory.findById(id).populate("companyId branchId");

    if (!item) {
        const error = new Error("Inventory item not found");
        error.statusCode = 404;
        throw error;
    }

    return item;
};

const updateInventory = async (id, payload) => {
    const item = await Inventory.findById(id);

    if (!item) {
        const error = new Error("Inventory item not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.customerName) item.customerName = payload.customerName;
    if (payload.phoneNumber !== undefined) item.phoneNumber = payload.phoneNumber;
    if (payload.email !== undefined) item.email = payload.email;
    if (payload.address !== undefined) item.address = payload.address;
    if (payload.companyName !== undefined) item.companyName = payload.companyName;
    if (payload.companyId !== undefined) item.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) item.branchId = payload.branchId || null;
    if (payload.status) item.status = payload.status;

    await item.save();

    return Inventory.findById(item._id).populate("companyId branchId");
};

const deleteInventory = async (id) => {
    const item = await Inventory.findByIdAndDelete(id);
    if (!item) {
        const error = new Error("Inventory item not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Inventory item deleted successfully" };
};

module.exports = {
    createInventory,
    getInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
};
