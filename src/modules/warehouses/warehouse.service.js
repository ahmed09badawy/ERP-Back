const Warehouse = require("./warehouse.model");
const generateCode = require("../../common/utils/generate-code");

const createWarehouse = async (payload) => {
    const code = await generateCode("warehouse", "WH");

    const warehouse = await Warehouse.create({
        ...payload,
        code,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
    });

    return Warehouse.findById(warehouse._id).populate("companyId branchId");
};

const getWarehouses = async () => {
    return Warehouse.find()
        .populate("companyId branchId")
        .sort({ createdAt: -1 });
};

const getWarehouseById = async (id) => {
    const warehouse = await Warehouse.findById(id).populate("companyId branchId");

    if (!warehouse) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
    }

    return warehouse;
};

const updateWarehouse = async (id, payload) => {
    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.warehouseName !== undefined) warehouse.warehouseName = payload.warehouseName;
    if (payload.type !== undefined) warehouse.type = payload.type;
    if (payload.companyId !== undefined) warehouse.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) warehouse.branchId = payload.branchId || null;
    if (payload.managerName !== undefined) warehouse.managerName = payload.managerName;
    if (payload.phoneNumber !== undefined) warehouse.phoneNumber = payload.phoneNumber;
    if (payload.location !== undefined) warehouse.location = payload.location;
    if (payload.state !== undefined) warehouse.state = payload.state;

    await warehouse.save();

    return Warehouse.findById(warehouse._id).populate("companyId branchId");
};

const updateWarehouseState = async (id, state) => {
    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
    }

    warehouse.state = state;
    await warehouse.save();

    return Warehouse.findById(warehouse._id).populate("companyId branchId");
};

const deleteWarehouse = async (id) => {
    const warehouse = await Warehouse.findById(id);

    if (!warehouse) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
    }

    await Warehouse.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createWarehouse,
    getWarehouses,
    getWarehouseById,
    updateWarehouse,
    updateWarehouseState,
    deleteWarehouse,
};
