const ManufacturingOrder = require("./manufacturing-order.model");
const Counter = require("../../assets/counter.model");
const eventBus = require("../../../common/events/eventBus");
const EVENTS = require("../../../common/events/eventTypes");

const generateMoNumber = async () => {
    const year = new Date().getFullYear();

    const counter = await Counter.findOneAndUpdate(
        { name: `mo_${year}` },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `MO/${year}/${String(counter.seq).padStart(3, "0")}`;
};

const generateProductCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "manufacturing_order_product_code" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `PRD-${String(counter.seq).padStart(4, "0")}`;
};

const createManufacturingOrder = async (data) => {
    const mo_number = await generateMoNumber();
    const product_code = await generateProductCode();

    const created = await ManufacturingOrder.create({
        mo_number,
        code: mo_number,
        product_code,
        ...data,
    });

    if (created.state === "Done") {
        eventBus.emitAsync(EVENTS.MANUFACTURING_ORDER_DONE, created.toObject());
    }

    return created;
};

const getAllManufacturingOrders = async (query) => {
    const filter = {};

    if (query.search) {
        filter.$or = [
            { mo_number: { $regex: query.search, $options: "i" } },
            { product_name: { $regex: query.search, $options: "i" } },
            { product_code: { $regex: query.search, $options: "i" } },
            { responsible: { $regex: query.search, $options: "i" } },
            { work_center: { $regex: query.search, $options: "i" } },
        ];
    }

    if (query.state && query.state !== "all_states") {
        filter.state = query.state;
    }

    if (query.mo_number && query.mo_number !== "all_mo_numbers") {
        filter.mo_number = { $regex: query.mo_number, $options: "i" };
    }

    const result = await ManufacturingOrder.find(filter).sort({
        createdAt: -1,
    });

    return result;
};

const getManufacturingOrderById = async (id) => {
    const result = await ManufacturingOrder.findById(id);

    if (!result) {
        throw new Error("Manufacturing Order not found");
    }

    return result;
};

const updateManufacturingOrder = async (id, data) => {
    const existing = await ManufacturingOrder.findById(id);

    if (!existing) {
        throw new Error("Manufacturing Order not found");
    }

    const previousState = existing.state;

    const result = await ManufacturingOrder.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!result) {
        throw new Error("Manufacturing Order not found");
    }

    if (previousState !== "Done" && result.state === "Done") {
        eventBus.emitAsync(EVENTS.MANUFACTURING_ORDER_DONE, result.toObject());
    }

    return result;
};

const deleteManufacturingOrder = async (id) => {
    const result = await ManufacturingOrder.findByIdAndDelete(id);

    if (!result) {
        throw new Error("Manufacturing Order not found");
    }

    return true;
};

module.exports = {
    createManufacturingOrder,
    getAllManufacturingOrders,
    getManufacturingOrderById,
    updateManufacturingOrder,
    deleteManufacturingOrder,
};
