const Product = require("../../modules/products/product.model");
const Warehouse = require("../../modules/warehouses/warehouse.model");
const BillOfMaterials = require("../../modules/manufacturing/bill-of-materials/bill-of-materials.model");
const stockService = require("../../modules/stock/stock.service");

const findProductByRef = async (ref) => {
    if (!ref) return null;

    const normalized = String(ref).trim();

    return (
        (await Product.findOne({ sku: normalized.toUpperCase() })) ||
        (await Product.findOne({ productName: { $regex: new RegExp(`^${normalized}$`, "i") } })) ||
        (await Product.findOne({ barcode: normalized }))
    );
};

const getDefaultWarehouse = async () =>
    Warehouse.findOne({ state: "ACTIVE" }).sort({ createdAt: 1 });

const processManufacturingCompletion = async (order) => {
    const warehouse = await getDefaultWarehouse();

    if (!warehouse) {
        console.warn("[ManufacturingHandler] No active warehouse found for stock movements");
        return;
    }

    const bom = await BillOfMaterials.findOne({
        $or: [{ bom_id: order.bom_used }, { code: order.bom_used }],
    });

    const finishedProduct =
        (await findProductByRef(order.product_code)) ||
        (await findProductByRef(order.product_name));

    const producedQty = order.produced_quantity || order.planned_quantity || 0;

    if (bom) {
        const componentProduct = await findProductByRef(bom.component_item);

        if (componentProduct && componentProduct.productType === "STOCKABLE") {
            const consumeQty = (bom.qty || 1) * producedQty;

            await stockService.stockOut({
                productId: componentProduct._id,
                warehouseId: warehouse._id,
                qty: consumeQty,
                referenceType: "manufacturing_order",
                referenceId: order.mo_number,
                notes: `Component consumed for MO ${order.mo_number}`,
            });
        }
    }

    if (finishedProduct && finishedProduct.productType === "STOCKABLE") {
        await stockService.stockIn({
            productId: finishedProduct._id,
            warehouseId: warehouse._id,
            qty: producedQty,
            unitCost: order.cost_summary / Math.max(producedQty, 1),
            referenceType: "manufacturing_order",
            referenceId: order.mo_number,
            notes: `Finished goods from MO ${order.mo_number}`,
        });
    }
};

module.exports = { processManufacturingCompletion };
