const Product = require("../products/product.model");
const Warehouse = require("../warehouses/warehouse.model");
const WarehouseStock = require("./warehouseStock.model");
const StockMovement = require("./stockMovement.model");

const recalculateStock = (stockDoc) => {
    stockDoc.availableQty = stockDoc.inStockQty - stockDoc.reservedQty;

    if (stockDoc.availableQty < 0) {
        stockDoc.availableQty = 0;
    }
};

const getOrCreateWarehouseStock = async (productId, warehouseId, session = null) => {
    const query = WarehouseStock.findOne({ productId, warehouseId });
    let stock = session ? await query.session(session) : await query;

    if (!stock) {
        const created = await WarehouseStock.create(
            [
                {
                    productId,
                    warehouseId,
                    inStockQty: 0,
                    reservedQty: 0,
                    availableQty: 0,
                    stockValue: 0,
                },
            ],
            session ? { session } : undefined
        );
        stock = created[0];
    }

    return stock;
};

const validateProductAndWarehouse = async (productId, warehouseId) => {
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
    }

    if (warehouse.state !== "ACTIVE") {
        const error = new Error("Warehouse is not active");
        error.statusCode = 400;
        throw error;
    }

    return { product, warehouse };
};

const stockIn = async (payload, session = null) => {
    const { productId, warehouseId, qty, unitCost, referenceType, referenceId, notes } = payload;

    const { product } = await validateProductAndWarehouse(productId, warehouseId);
    const stock = await getOrCreateWarehouseStock(productId, warehouseId, session);

    stock.inStockQty += qty;
    recalculateStock(stock);

    if (unitCost > 0) {
        stock.stockValue = stock.inStockQty * unitCost;
    } else {
        stock.stockValue = stock.inStockQty * (product.cost || 0);
    }

    await stock.save(session ? { session } : undefined);

    await StockMovement.create(
        [
            {
                productId,
                warehouseId,
                movementType: "IN",
                qty,
                referenceType,
                referenceId,
                notes,
            },
        ],
        session ? { session } : undefined
    );

    const stockQuery = WarehouseStock.findById(stock._id).populate("productId warehouseId");
    return session ? stockQuery.session(session) : stockQuery;
};

const stockOut = async (payload, session = null) => {
    const { productId, warehouseId, qty, referenceType, referenceId, notes } = payload;

    await validateProductAndWarehouse(productId, warehouseId);
    const stock = await getOrCreateWarehouseStock(productId, warehouseId, session);

    if (stock.availableQty < qty) {
        const error = new Error("Insufficient available stock");
        error.statusCode = 400;
        throw error;
    }

    stock.inStockQty -= qty;
    recalculateStock(stock);

    if (stock.inStockQty < 0) stock.inStockQty = 0;
    if (stock.stockValue < 0) stock.stockValue = 0;

    await stock.save(session ? { session } : undefined);

    await StockMovement.create(
        [
            {
                productId,
                warehouseId,
                movementType: "OUT",
                qty,
                referenceType,
                referenceId,
                notes,
            },
        ],
        session ? { session } : undefined
    );

    const stockQuery = WarehouseStock.findById(stock._id).populate("productId warehouseId");
    return session ? stockQuery.session(session) : stockQuery;
};

const reserveStock = async (payload, session = null) => {
    const { productId, warehouseId, qty, referenceType, referenceId, notes } = payload;

    await validateProductAndWarehouse(productId, warehouseId);
    const stock = await getOrCreateWarehouseStock(productId, warehouseId, session);

    if (stock.availableQty < qty) {
        const error = new Error("Insufficient available stock to reserve");
        error.statusCode = 400;
        throw error;
    }

    stock.reservedQty += qty;
    recalculateStock(stock);

    await stock.save(session ? { session } : undefined);

    await StockMovement.create(
        [
            {
                productId,
                warehouseId,
                movementType: "RESERVE",
                qty,
                referenceType,
                referenceId,
                notes,
            },
        ],
        session ? { session } : undefined
    );

    const stockQuery = WarehouseStock.findById(stock._id).populate("productId warehouseId");
    return session ? stockQuery.session(session) : stockQuery;
};

const releaseStock = async (payload, session = null) => {
    const { productId, warehouseId, qty, referenceType, referenceId, notes } = payload;

    await validateProductAndWarehouse(productId, warehouseId);
    const stock = await getOrCreateWarehouseStock(productId, warehouseId, session);

    if (stock.reservedQty < qty) {
        const error = new Error("Insufficient reserved stock to release");
        error.statusCode = 400;
        throw error;
    }

    stock.reservedQty -= qty;
    recalculateStock(stock);

    await stock.save(session ? { session } : undefined);

    await StockMovement.create(
        [
            {
                productId,
                warehouseId,
                movementType: "RELEASE",
                qty,
                referenceType,
                referenceId,
                notes,
            },
        ],
        session ? { session } : undefined
    );

    const stockQuery = WarehouseStock.findById(stock._id).populate("productId warehouseId");
    return session ? stockQuery.session(session) : stockQuery;
};

const getStockList = async () => {
    return WarehouseStock.find()
        .populate("productId warehouseId")
        .sort({ updatedAt: -1 });
};

const getProductMovements = async (productId) => {
    return StockMovement.find({ productId })
        .populate("productId warehouseId")
        .sort({ movementDate: -1 });
};

const getAllMovements = async (query = {}) => {
    const filter = {};
    if (query.movementType) filter.movementType = query.movementType;
    if (query.warehouseId) filter.warehouseId = query.warehouseId;
    if (query.productId) filter.productId = query.productId;

    return StockMovement.find(filter)
        .populate("productId warehouseId")
        .sort({ movementDate: -1 });
};

module.exports = {
    stockIn,
    stockOut,
    reserveStock,
    releaseStock,
    getStockList,
    getProductMovements,
    getAllMovements,
};
