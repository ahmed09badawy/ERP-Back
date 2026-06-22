const Product = require("./product.model");
const generateCode = require("../../common/utils/generate-code");

const createProduct = async (payload) => {
    const sku = await generateCode("product", "SKU");

    const product = await Product.create({
        ...payload,
        sku,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
    });

    return Product.findById(product._id).populate("companyId branchId");
};

const getProducts = async () => {
    return Product.find()
        .populate("companyId branchId")
        .sort({ createdAt: -1 });
};

const getProductById = async (id) => {
    const product = await Product.findById(id).populate("companyId branchId");

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    return product;
};

const updateProduct = async (id, payload) => {
    const product = await Product.findById(id);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.productName) product.productName = payload.productName;
    if (payload.category !== undefined) product.category = payload.category;
    if (payload.productType) product.productType = payload.productType;
    if (payload.salesPrice !== undefined) product.salesPrice = payload.salesPrice;
    if (payload.cost !== undefined) product.cost = payload.cost;
    if (payload.description !== undefined) product.description = payload.description;
    if (payload.unitOfMeasure !== undefined) product.unitOfMeasure = payload.unitOfMeasure;
    if (payload.barcode !== undefined) product.barcode = payload.barcode;
    if (payload.companyName !== undefined) product.companyName = payload.companyName;
    if (payload.companyId !== undefined) product.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) product.branchId = payload.branchId || null;
    if (payload.hasExpiry !== undefined) product.hasExpiry = payload.hasExpiry;
    if (payload.status) product.status = payload.status;

    await product.save();

    return Product.findById(product._id).populate("companyId branchId");
};

const updateProductStatus = async (id, status) => {
    const product = await Product.findById(id);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    product.status = status;
    await product.save();

    return Product.findById(product._id).populate("companyId branchId");
};

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Product deleted successfully" };
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateProductStatus,
    deleteProduct,
};
