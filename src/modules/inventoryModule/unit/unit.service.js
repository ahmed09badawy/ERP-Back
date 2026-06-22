const Unit = require("./unit.model");
const generateCode = require("../../../common/utils/generate-code");

const createUnit = async (payload) => {
    const existing = await Unit.findOne({
        abbreviation: payload.abbreviation.toUpperCase(),
        isDeleted: false,
    });

    if (existing) {
        const error = new Error("Unit abbreviation already exists");
        error.statusCode = 400;
        throw error;
    }

    const code = await generateCode("unit", "UNT");

    const unit = await Unit.create({
        ...payload,
        code,
        abbreviation: payload.abbreviation.toUpperCase(),
        status: payload.status || "ACTIVE",
    });

    return unit;
};

const getUnits = async (query = {}) => {
    const filter = { isDeleted: false };

    if (query.name) {
        filter.name = { $regex: query.name, $options: "i" };
    }

    if (query.status) {
        filter.status = query.status;
    }

    return Unit.find(filter).sort({ createdAt: -1 });
};

const getUnitById = async (id) => {
    const unit = await Unit.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!unit) {
        const error = new Error("Unit not found");
        error.statusCode = 404;
        throw error;
    }

    return unit;
};

const updateUnit = async (id, payload) => {
    const unit = await Unit.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!unit) {
        const error = new Error("Unit not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.abbreviation && payload.abbreviation !== unit.abbreviation) {
        const existing = await Unit.findOne({
            abbreviation: payload.abbreviation.toUpperCase(),
            isDeleted: false,
            _id: { $ne: id },
        });

        if (existing) {
            const error = new Error("Unit abbreviation already exists");
            error.statusCode = 400;
            throw error;
        }

        unit.abbreviation = payload.abbreviation.toUpperCase();
    }

    if (payload.name !== undefined) unit.name = payload.name;
    if (payload.parentUnit !== undefined) unit.parentUnit = payload.parentUnit;
    if (payload.conversionFactor !== undefined) unit.conversionFactor = payload.conversionFactor;
    if (payload.status !== undefined) unit.status = payload.status;

    // Ensure code exists for legacy records during update
    if (!unit.code) {
        unit.code = await generateCode("unit", "UNT");
    }

    await unit.save();

    return unit;
};

const deleteUnit = async (id) => {
    const unit = await Unit.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!unit) {
        const error = new Error("Unit not found");
        error.statusCode = 404;
        throw error;
    }

    unit.isDeleted = true;
    await unit.save();

    return true;
};

module.exports = {
    createUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit,
};
