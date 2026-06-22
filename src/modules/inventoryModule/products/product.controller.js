const productService = require("../../inventoryModule/products/product.service");
const {
    createProductSchema,
    updateProductSchema,
} = require("../../inventoryModule/products/product.validation");

const createProduct = async (req, res) => {
    const validatedData = createProductSchema.parse(req.body);
    const product = await productService.createProduct(validatedData);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
};

const getProducts = async (req, res) => {
    const { products, pagination } = await productService.getProducts(req.query);

    res.status(200).json({
        success: true,
        data: products,
        pagination
    });
};

const getProductById = async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    res.status(200).json({
        success: true,
        data: product,
    });
};

const updateProduct = async (req, res) => {
    const validatedData = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
};

const deleteProduct = async (req, res) => {
    await productService.deleteProduct(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
