const Allocation = require("./allocation.model");
const Counter = require("../counter.model")
const generateCode = require("../../../common/utils/generate-code");

const createAllocation = async (data) => {
    const allocationCode = await generateCode("allocation", "ALL");
    const allocation = await Allocation.create({
        ...data,
        allocationCode,
    });

    return allocation;
};

const getAllAllocations = async (filters) => {
    const query = {};

    if (filters.assetId) {
        query.assetId = filters.assetId;
    }

    const allocations = await Allocation.find(query)
        .populate("assetId", "assetName serialNumber category location")
        .sort({ createdAt: -1 });

    return allocations;
};

const getAllocationById = async (id) => {
    const allocation = await Allocation.findById(id).populate(
        "assetId",
        "assetName serialNumber category location"
    );
    return allocation;
};

const updateAllocation = async (id, data) => {
    const allocation = await Allocation.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    }).populate("assetId", "assetName serialNumber category location");

    return allocation;
};

const deleteAllocation = async (id) => {
    const allocation = await Allocation.findByIdAndDelete(id);
    return allocation;
};

module.exports = {
    createAllocation,
    getAllAllocations,
    getAllocationById,
    updateAllocation,
    deleteAllocation,
};
