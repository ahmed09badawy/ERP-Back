const categoryService = require("./category.service");
const {
    createCategorySchema,
    updateCategorySchema,
} = require("./category.validation");

const createCategory = async (req, res) => {
    const validatedData = createCategorySchema.parse(req.body);
    const category = await categoryService.createCategory(validatedData);

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
    });
};

const getCategories = async (req, res) => {
    const categories = await categoryService.getCategories(req.query);

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
    });
};

const getCategoryById = async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id);

    res.status(200).json({
        success: true,
        data: category,
    });
};

const updateCategory = async (req, res) => {
    const validatedData = updateCategorySchema.parse(req.body);
    const category = await categoryService.updateCategory(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category,
    });
};

const deleteCategory = async (req, res) => {
    await categoryService.deleteCategory(req.params.id);

    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
    });
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
