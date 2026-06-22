const CostCenter = require("./costCenter.model");
const generateCode = require("../../../common/utils/generate-code");

const createCostCenter = async (payload) => {
    const code = payload.code
        ? payload.code.toUpperCase()
        : await generateCode("cost_center", "CC");

    const exists = await CostCenter.findOne({
        code,
    });

    if (exists) {
        throw new Error("Cost center code already exists");
    }

    const data = await CostCenter.create({
        ...payload,
        code,
    });

    return data;
};

const getAllCostCenters = async (query) => {
    const { search } = query;

    const filter = {};

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { code: { $regex: search, $options: "i" } },
        ];
    }

    return await CostCenter.find(filter).sort({ createdAt: -1 });
};

const getCostCenterById = async (id) => {
    const data = await CostCenter.findById(id);

    if (!data) throw new Error("Cost center not found");

    return data;
};

const updateCostCenter = async (id, payload) => {
    if (payload.code) {
        const exists = await CostCenter.findOne({
            code: payload.code.toUpperCase(),
            _id: { $ne: id },
        });

        if (exists) {
            throw new Error("Cost center code already exists");
        }

        payload.code = payload.code.toUpperCase();
    }

    const updated = await CostCenter.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!updated) throw new Error("Cost center not found");

    return updated;
};

const deleteCostCenter = async (id) => {
    const deleted = await CostCenter.findByIdAndDelete(id);

    if (!deleted) throw new Error("Cost center not found");

    return deleted;
};

module.exports = {
    createCostCenter,
    getAllCostCenters,
    getCostCenterById,
    updateCostCenter,
    deleteCostCenter,
};
