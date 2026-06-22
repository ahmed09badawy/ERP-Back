const WorkCenter = require("./work-center.model");
const Counter = require("../../assets/counter.model");

const generateWorkCenterId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "work_center" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `WC-${String(counter.seq).padStart(3, "0")}`;
};

const createWorkCenter = async (data) => {
    const work_center_id = await generateWorkCenterId();

    const created = await WorkCenter.create({
        work_center_id,
        code: data.code || work_center_id,
        ...data,
    });

    return created;
};

const getAllWorkCenters = async (query) => {
    const filter = {};

    if (query.state && query.state !== "all_states") {
        filter.state = query.state;
    }

    if (query.work_center_id) {
        filter.work_center_id = {
            $regex: query.work_center_id,
            $options: "i",
        };
    }

    const result = await WorkCenter.find(filter).sort({ createdAt: -1 });

    return result;
};

const getWorkCenterById = async (id) => {
    const result = await WorkCenter.findById(id);

    if (!result) throw new Error("Work Center not found");

    return result;
};

const updateWorkCenter = async (id, data) => {
    const result = await WorkCenter.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!result) throw new Error("Work Center not found");

    return result;
};

const deleteWorkCenter = async (id) => {
    const result = await WorkCenter.findByIdAndDelete(id);

    if (!result) throw new Error("Work Center not found");

    return true;
};

module.exports = {
    createWorkCenter,
    getAllWorkCenters,
    getWorkCenterById,
    updateWorkCenter,
    deleteWorkCenter,
};
