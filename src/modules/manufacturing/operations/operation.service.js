const Operation = require("./operation.model");
const Counter = require("../../assets/counter.model");

const generateOperationId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "operation" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `OP-${String(counter.seq).padStart(3, "0")}`;
};

const createOperation = async (data) => {
    const operation_id = await generateOperationId();
    // Keep `code` auto-generated and non-null to satisfy unique index constraints.
    const code = operation_id;

    const created = await Operation.create({
        code,
        operation_id,
        ...data,
    });

    return created;
};

const getAllOperations = async (query) => {
    const filter = {};

    if (query.operation_name) {
        filter.operation_name = {
            $regex: query.operation_name,
            $options: "i",
        };
    }

    if (query.operation_id) {
        filter.operation_id = {
            $regex: query.operation_id,
            $options: "i",
        };
    }

    const result = await Operation.find(filter).sort({ createdAt: -1 });

    return result;
};

const getOperationById = async (id) => {
    const result = await Operation.findById(id);

    if (!result) {
        throw new Error("Operation not found");
    }

    return result;
};

const updateOperation = async (id, data) => {
    const result = await Operation.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!result) {
        throw new Error("Operation not found");
    }

    return result;
};

const deleteOperation = async (id) => {
    const result = await Operation.findByIdAndDelete(id);

    if (!result) {
        throw new Error("Operation not found");
    }

    return true;
};

module.exports = {
    createOperation,
    getAllOperations,
    getOperationById,
    updateOperation,
    deleteOperation,
};
