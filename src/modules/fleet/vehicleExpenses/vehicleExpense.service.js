const VehicleExpense = require("./vehicleExpense.model");
const Vehicle = require("../vehicles/vehicle.model");
const Counter = require("../../assets/counter.model");

const generateExpenseCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "vehicleExpense" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `EXP-${String(counter.seq).padStart(4, "0")}`;
};

const createVehicleExpense = async (payload) => {
    const vehicle = await Vehicle.findById(payload.vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");

    const expenseCode = await generateExpenseCode();

    const expense = await VehicleExpense.create({
        ...payload,
        expenseCode,
    });

    return expense;
};

const getAllVehicleExpenses = async (query) => {
    const { search, status } = query;

    const filter = {};

    if (status && status !== "all_statuses") {
        filter.status = status;
    }

    if (search) {
        filter.$or = [
            { type: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    return await VehicleExpense.find(filter)
        .populate("vehicleId")
        .sort({ createdAt: -1 });
};

const getVehicleExpenseById = async (id) => {
    const expense = await VehicleExpense.findById(id).populate("vehicleId");

    if (!expense) throw new Error("Expense not found");

    return expense;
};

const updateVehicleExpense = async (id, payload) => {
    const expense = await VehicleExpense.findByIdAndUpdate(id, payload, {
        returnDocument: "after",
        runValidators: true,
    });

    if (!expense) throw new Error("Expense not found");

    return expense;
};

const deleteVehicleExpense = async (id) => {
    const expense = await VehicleExpense.findByIdAndDelete(id);

    if (!expense) throw new Error("Expense not found");

    return expense;
};

module.exports = {
    createVehicleExpense,
    getAllVehicleExpenses,
    getVehicleExpenseById,
    updateVehicleExpense,
    deleteVehicleExpense,
};
