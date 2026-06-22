const ManufacturingOrder = require("../manufacturing-orders/manufacturing-order.model");
const Operation = require("../operations/operation.model");

const getProductionReports = async () => {
    const orders = await ManufacturingOrder.find();

    const result = [];

    for (const order of orders) {
        const operations = await Operation.find({
            work_center: order.work_center,
        });

        // calculations
        const completion =
            order.planned_quantity === 0
                ? 0
                : (order.produced_quantity / order.planned_quantity) * 100;

        const operation_duration = operations.reduce(
            (sum, op) => sum + op.duration,
            0
        );

        const operation_cost = operations.reduce(
            (sum, op) => sum + op.cost,
            0
        );

        const material_cost = order.planned_quantity * 20; // mock

        const total_production_cost = operation_cost + material_cost;

        const scrap_qty =
            order.planned_quantity - order.produced_quantity;

        result.push({
            mo_number: order.mo_number,
            finished_product: order.product_name,
            planned_qty: order.planned_quantity,
            produced_qty: order.produced_quantity,
            completion: Number(completion.toFixed(1)),
            materials_consumed: order.produced_quantity,
            scrap_qty: scrap_qty < 0 ? 0 : scrap_qty,
            start_time: order.start_date,
            end_time: order.end_date,
            operation_duration,
            operation_cost,
            material_cost,
            total_production_cost,
            responsible: order.responsible,
            production_status: order.state,
            notes: "Auto generated report",
        });
    }

    return result;
};
module.exports = {
    getProductionReports,
};
