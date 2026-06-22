const productService = require("./product.service");
const {
    createProductSchema,
    updateProductSchema,
    updateProductStatusSchema,
} = require("./product.validation");

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
    const products = await productService.getProducts();

    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
    });
};

const getProductById = async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product details retrieved successfully",
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

const updateProductStatus = async (req, res) => {
    const validatedData = updateProductStatusSchema.parse(req.body);
    const product = await productService.updateProductStatus(req.params.id, validatedData.status);

    res.status(200).json({
        success: true,
        message: "Product status updated successfully",
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
    updateProductStatus,
    deleteProduct,
};
