const MaterialRequirement = require("./material-requirement.model");

const createMaterialRequirement = async (data) => {
    const created = await MaterialRequirement.create(data);
    return created;
};

const getAllMaterialRequirements = async (query) => {
    const filter = {};

    if (query.material) {
        filter.material = { $regex: query.material, $options: "i" };
    }

    const result = await MaterialRequirement.find(filter).sort({
        createdAt: -1,
    });

    return result;
};

const getMaterialRequirementById = async (id) => {
    const result = await MaterialRequirement.findById(id);

    if (!result) {
        throw new Error("Material Requirement not found");
    }

    return result;
};

const updateMaterialRequirement = async (id, data) => {
    const result = await MaterialRequirement.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!result) {
        throw new Error("Material Requirement not found");
    }

    return result;
};

const deleteMaterialRequirement = async (id) => {
    const result = await MaterialRequirement.findByIdAndDelete(id);

    if (!result) {
        throw new Error("Material Requirement not found");
    }

    return true;
};

module.exports = {
    createMaterialRequirement,
    getAllMaterialRequirements,
    getMaterialRequirementById,
    updateMaterialRequirement,
    deleteMaterialRequirement,
};  
