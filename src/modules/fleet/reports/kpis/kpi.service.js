const FuelLog = require("../../fuelLogs/fuelLog.model");
const Maintenance = require("../../maintenance/maintenance.model");
const Vehicle = require("../../vehicles/vehicle.model");
const Accident = require("../../accidents/accident.model");

const getFleetKPIs = async () => {
    const fuelLogs = await FuelLog.find().sort({ vehicleId: 1, date: 1 });

    let totalFuelCost = 0;
    let totalFuelQty = 0;
    let totalDistance = 0;

    const lastOdometerByVehicle = {};

    fuelLogs.forEach((log) => {
        totalFuelCost += log.cost || 0;
        totalFuelQty += log.quantity || 0;

        const vehicleKey = log.vehicleId.toString();

        if (lastOdometerByVehicle[vehicleKey] !== undefined) {
            const distance = log.odometer - lastOdometerByVehicle[vehicleKey];

            if (distance > 0) {
                totalDistance += distance;
            }
        }

        lastOdometerByVehicle[vehicleKey] = log.odometer;
    });

    const avgFuelCostPerKM =
        totalDistance > 0 ? totalFuelCost / totalDistance : 0;

    const fuelEfficiency =
        totalDistance > 0 && totalFuelQty > 0 ? totalDistance / totalFuelQty : 0;

    const maintenanceData = await Maintenance.aggregate([
        {
            $group: {
                _id: "$vehicleId",
                totalCost: { $sum: "$cost" },
            },
        },
        {
            $group: {
                _id: null,
                avgCost: { $avg: "$totalCost" },
            },
        },
    ]);

    const avgMaintenanceCost = maintenanceData[0]?.avgCost || 0;

    const topVehicle = await Vehicle.findOne().sort({ mileage: -1 });

    const totalVehicles = await Vehicle.countDocuments();
    const totalAccidents = await Accident.countDocuments();

    const accidentRate = totalVehicles ? totalAccidents / totalVehicles : 0;

    return {
        cards: {
            avgFuelCostPerKM: Number(avgFuelCostPerKM.toFixed(2)),
            avgMaintenanceCost: Number(avgMaintenanceCost.toFixed(0)),
            topVehicle: topVehicle
                ? `${topVehicle.vehicleCode} (${topVehicle.model})`
                : null,
            accidentRate: Number(accidentRate.toFixed(2)),
        },

        table: [
            {
                metric: "Fuel Efficiency",
                category: "Fuel",
                value: `${Number(fuelEfficiency.toFixed(2))} km/L`,
                target: "9.0 km/L",
                trend: fuelEfficiency >= 9 ? "up" : "down",
                status: fuelEfficiency >= 9 ? "good" : "warning",
            },
            {
                metric: "Maintenance Cost per Vehicle",
                category: "Maintenance",
                value: `${Number(avgMaintenanceCost.toFixed(0))} EGP`,
                target: "1000 EGP",
                trend: avgMaintenanceCost > 1000 ? "down" : "up",
                status: avgMaintenanceCost > 1000 ? "warning" : "good",
            },
            {
                metric: "Accident Rate",
                category: "Accidents",
                value: Number(accidentRate.toFixed(2)),
                target: "0.02",
                trend: accidentRate > 0.02 ? "down" : "stable",
                status: accidentRate > 0.02 ? "critical" : "good",
            },
        ],
    };
};

module.exports = {
    getFleetKPIs,
};
