const Vehicle = require("../vehicles/vehicle.model");
const Driver = require("../drivers/driver.model");
const FuelLog = require("../fuelLogs/fuelLog.model");
const Maintenance = require("../maintenance/maintenance.model");
const Accident = require("../accidents/accident.model");

const PERIOD_OPTIONS = [
    { label: "This Month", value: "this_month" },
    { label: "This Quarter", value: "this_quarter" },
    { label: "This Year", value: "this_year" },
];

const MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const getPeriodRange = (period = "this_month") => {
    const now = new Date();

    if (period === "this_quarter") {
        const quarter = Math.floor(now.getMonth() / 3);

        return {
            selected: "this_quarter",
            label: "This Quarter",
            startDate: new Date(now.getFullYear(), quarter * 3, 1),
            endDate: now,
        };
    }

    if (period === "this_year") {
        return {
            selected: "this_year",
            label: "This Year",
            startDate: new Date(now.getFullYear(), 0, 1),
            endDate: now,
        };
    }

    return {
        selected: "this_month",
        label: "This Month",
        startDate: new Date(now.getFullYear(), now.getMonth(), 1),
        endDate: now,
    };
};

const buildDefaultFuelWeeks = () => [
    { label: "Week 1", value: 0 },
    { label: "Week 2", value: 0 },
    { label: "Week 3", value: 0 },
    { label: "Week 4", value: 0 },
];

const buildDefaultMonths = (period) => {
    const now = new Date();

    if (period === "this_year") {
        return MONTH_NAMES.map((month, index) => ({
            monthIndex: index,
            label: month,
            value: 0,
        }));
    }

    if (period === "this_quarter") {
        const quarter = Math.floor(now.getMonth() / 3);
        const startMonth = quarter * 3;

        return [
            {
                monthIndex: startMonth,
                label: MONTH_NAMES[startMonth],
                value: 0,
            },
            {
                monthIndex: startMonth + 1,
                label: MONTH_NAMES[startMonth + 1],
                value: 0,
            },
            {
                monthIndex: startMonth + 2,
                label: MONTH_NAMES[startMonth + 2],
                value: 0,
            },
        ];
    }

    return [
        {
            monthIndex: now.getMonth(),
            label: MONTH_NAMES[now.getMonth()],
            value: 0,
        },
    ];
};

const buildDefaultDamageLevels = () => [
    { label: "Low", value: 0 },
    { label: "Medium", value: 0 },
    { label: "High", value: 0 },
    { label: "Severe", value: 0 },
];

const getFleetDashboard = async (period = "this_month") => {
    const periodData = getPeriodRange(period);
    const { selected, label, startDate, endDate } = periodData;

    const activeVehicles = await Vehicle.countDocuments({
        status: "Active",
    });

    const activeDrivers = await Driver.countDocuments({
        status: "Active",
    });

    const vehiclesUnderMaintenance = await Vehicle.countDocuments({
        status: { $in: ["Maintenance", "In Maintenance"] },
    });

    const accidentsThisPeriod = await Accident.countDocuments({
        date: { $gte: startDate, $lte: endDate },
    });

    const fuelCostData = await FuelLog.aggregate([
        {
            $match: {
                date: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: { $week: "$date" },
                totalCost: { $sum: "$cost" },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ]);

    const fuelCostThisPeriod = fuelCostData.length
        ? fuelCostData.map((item, index) => ({
            label: `Week ${index + 1}`,
            value: item.totalCost,
        }))
        : buildDefaultFuelWeeks();

    const maintenanceCostData = await Maintenance.aggregate([
        {
            $match: {
                date: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: { $month: "$date" },
                totalCost: { $sum: "$cost" },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ]);

    const maintenanceCostMonths = buildDefaultMonths(selected);

    maintenanceCostData.forEach((item) => {
        const monthIndex = item._id - 1;

        const index = maintenanceCostMonths.findIndex(
            (month) => month.monthIndex === monthIndex
        );

        if (index !== -1) {
            maintenanceCostMonths[index].value = item.totalCost;
        }
    });

    const maintenanceCostThisPeriod = maintenanceCostMonths.map((item) => ({
        label: item.label,
        value: item.value,
    }));

    const accidentsByDamageData = await Accident.aggregate([
        {
            $match: {
                date: { $gte: startDate, $lte: endDate },
            },
        },
        {
            $group: {
                _id: "$damageLevel",
                count: { $sum: 1 },
            },
        },
    ]);

    const accidentsByDamageLevel = buildDefaultDamageLevels();

    accidentsByDamageData.forEach((item) => {
        const index = accidentsByDamageLevel.findIndex(
            (level) =>
                level.label.toLowerCase() === String(item._id).toLowerCase()
        );

        if (index !== -1) {
            accidentsByDamageLevel[index].value = item.count;
        }
    });

    const upcomingMaintenance = await Maintenance.find({
        status: "Scheduled",
        date: { $gte: new Date() },
    })
        .populate("vehicleId")
        .sort({ date: 1 })
        .limit(5);

    return {
        period: {
            selected,
            label,
            options: PERIOD_OPTIONS,
        },

        cards: {
            activeVehicles,
            activeDrivers,
            vehiclesUnderMaintenance,
            accidentsThisPeriod,
        },

        charts: {
            fuelCostThisPeriod,
            maintenanceCostThisPeriod,
            accidentsByDamageLevel,
        },

        upcomingMaintenance: upcomingMaintenance.map((item) => ({
            id: item._id,
            vehicle: item.vehicleId
                ? `${item.vehicleId.vehicleCode} (${item.vehicleId.model})`
                : "N/A",
            type: item.type,
            date: item.date,
            status: item.status,
            dueLabel: "Due Soon",
        })),
    };
};

module.exports = {
    getFleetDashboard,
};
