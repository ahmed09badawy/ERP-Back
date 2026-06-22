const Product = require("../../inventoryModule/products/product.model");
const Warehouse = require("../../warehouses/warehouse.model");
const generateCode = require("../../../common/utils/generate-code");

const createProduct = async (payload) => {
    const sku = await generateCode("product", "PROD");

    const existingBarcode = await Product.findOne({
        barcode: payload.barcode,
        isDeleted: false,
    });

    if (existingBarcode) {
        const error = new Error("Barcode already exists");
        error.statusCode = 400;
        throw error;
    }

    const warehouse = await Warehouse.findById(payload.warehouseId);
    if (!warehouse) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
    }

    const product = await Product.create({
        ...payload,
        sku,
        code: sku,
        image: payload.image || "",
        isStockItem: payload.isStockItem || "YES",
        expired: payload.expired || "NO",
    });

    return Product.findById(product._id)
        .populate("warehouseId")
        .populate({
            path: "category",
            populate: ["incomeAccountId", "expenseAccountId"]
        });
};

const getProducts = async (query = {}) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { isDeleted: false };

    if (query.search) {
        filter.$or = [
            { productName: { $regex: query.search, $options: "i" } },
            { sku: { $regex: query.search, $options: "i" } },
            { barcode: { $regex: query.search, $options: "i" } },
        ];
    }

    if (query.category) filter.category = query.category;
    if (query.warehouseId) filter.warehouseId = query.warehouseId;
    if (query.isStockItem) filter.isStockItem = query.isStockItem;
    if (query.expired) filter.expired = query.expired;

    const [products, total] = await Promise.all([
        Product.find(filter)
            .populate("warehouseId")
            .populate({
                path: "category",
                populate: ["incomeAccountId", "expenseAccountId"]
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Product.countDocuments(filter)
    ]);

    return {
        products,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    };
};

const getProductById = async (id) => {
    const product = await Product.findOne({
        _id: id,
        isDeleted: false,
    })
    .populate("warehouseId")
    .populate({
        path: "category",
        populate: ["incomeAccountId", "expenseAccountId"]
    });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    return product;
};

const updateProduct = async (id, payload) => {
    const product = await Product.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.barcode && payload.barcode !== product.barcode) {
        const existingBarcode = await Product.findOne({
            barcode: payload.barcode,
            isDeleted: false,
            _id: { $ne: id },
        });

        if (existingBarcode) {
            const error = new Error("Barcode already exists");
            error.statusCode = 400;
            throw error;
        }

        product.barcode = payload.barcode;
    }

    if (payload.warehouseId) {
        const warehouse = await Warehouse.findById(payload.warehouseId);
        if (!warehouse) {
            const error = new Error("Warehouse not found");
            error.statusCode = 404;
            throw error;
        }

        product.warehouseId = payload.warehouseId;
    }

    if (payload.image !== undefined) product.image = payload.image;
    if (payload.productName !== undefined) product.productName = payload.productName;
    if (payload.category !== undefined) product.category = payload.category;
    if (payload.defaultUnit !== undefined) product.defaultUnit = payload.defaultUnit;
    if (payload.isStockItem !== undefined) product.isStockItem = payload.isStockItem;
    if (payload.companyName !== undefined) product.companyName = payload.companyName;
    if (payload.openingStock !== undefined) product.openingStock = payload.openingStock;
    if (payload.reorderLevel !== undefined) product.reorderLevel = payload.reorderLevel;
    if (payload.currentStockQty !== undefined) product.currentStockQty = payload.currentStockQty;
    if (payload.expired !== undefined) product.expired = payload.expired;
    if (payload.purchasePrice !== undefined) product.purchasePrice = payload.purchasePrice;
    if (payload.sellingPrice !== undefined) product.sellingPrice = payload.sellingPrice;
    if (payload.description !== undefined) product.description = payload.description;

    await product.save();

    return Product.findById(product._id)
        .populate("warehouseId")
        .populate({
            path: "category",
            populate: ["incomeAccountId", "expenseAccountId"]
        });
};

const deleteProduct = async (id) => {
    const product = await Product.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    product.isDeleted = true;
    await product.save();

    return true;
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
