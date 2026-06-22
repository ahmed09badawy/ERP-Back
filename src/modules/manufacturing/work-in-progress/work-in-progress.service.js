const WIP = require("./work-in-progress.model");
const Counter = require("../../assets/counter.model");

const generateMoNumber = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "wip_mo_number" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `MO-${String(counter.seq).padStart(3, "0")}`;
};

const createWip = async (data) => {
    const mo_number = await generateMoNumber();

    const created = await WIP.create({
        mo_number,
        code: mo_number,
        ...data,
    });

    return created;
};

const getAllWip = async (query) => {
    const filter = {};

    if (query.product) {
        filter.product = { $regex: query.product, $options: "i" };
    }

    const result = await WIP.find(filter).sort({ createdAt: -1 });

    return result;
};

const getWipById = async (id) => {
    const result = await WIP.findById(id);

    if (!result) throw new Error("WIP not found");

    return result;
};

const updateWip = async (id, data) => {
    const result = await WIP.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!result) throw new Error("WIP not found");

    return result;
};

const deleteWip = async (id) => {
    const result = await WIP.findByIdAndDelete(id);

    if (!result) throw new Error("WIP not found");

    return true;
};

module.exports = {
    createWip,
    getAllWip,
    getWipById,
    updateWip,
    deleteWip,
};
