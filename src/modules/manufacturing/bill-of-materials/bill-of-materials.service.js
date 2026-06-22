const BillOfMaterials = require("./bill-of-materials.model");
const Counter = require("../../assets/counter.model");

const generateBomId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "bom" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `BOM-${String(counter.seq).padStart(4, "0")}`;
};

const generateProductCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "product_code" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `PRD-${String(counter.seq).padStart(4, "0")}`;
};

const createBillOfMaterials = async (data) => {
    const bom_id = await generateBomId();
    const product_code = await generateProductCode();

    const created = await BillOfMaterials.create({
        bom_id,
        code: bom_id,
        product_code,
        ...data,
    });

    return created;
};

const getAllBillOfMaterials = async (query) => {
    const filter = {};

    if (query.product_name) {
        filter.product_name = { $regex: query.product_name, $options: "i" };
    }

    if (query.bom_id) {
        filter.bom_id = { $regex: query.bom_id, $options: "i" };
    }

    const result = await BillOfMaterials.find(filter).sort({ createdAt: -1 });

    return result;
};

const getBillOfMaterialsById = async (id) => {
    const result = await BillOfMaterials.findById(id);

    if (!result) throw new Error("BOM not found");

    return result;
};

const updateBillOfMaterials = async (id, data) => {
    const result = await BillOfMaterials.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!result) throw new Error("BOM not found");

    return result;
};

const deleteBillOfMaterials = async (id) => {
    const result = await BillOfMaterials.findByIdAndDelete(id);

    if (!result) throw new Error("BOM not found");

    return true;
};

module.exports = {
    createBillOfMaterials,
    getAllBillOfMaterials,
    getBillOfMaterialsById,
    updateBillOfMaterials,
    deleteBillOfMaterials,
};
