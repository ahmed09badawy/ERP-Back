const supplierService = require("./supplier.service");
const {
    createSupplierSchema,
    updateSupplierSchema,
    updateSupplierStatusSchema,
} = require("./supplier.validation");

const createSupplier = async (req, res) => {
    const validatedData = createSupplierSchema.parse(req.body);
    const supplier = await supplierService.createSupplier(validatedData);

    res.status(201).json({
        success: true,
        message: "Supplier created successfully",
        data: supplier,
    });
};

const getSuppliers = async (req, res) => {
    const suppliers = await supplierService.getSuppliers();

    res.status(200).json({
        success: true,
        count: suppliers.length,
        data: suppliers,
    });
};

const getSupplierById = async (req, res) => {
    const supplier = await supplierService.getSupplierById(req.params.id);

    res.status(200).json({
        success: true,
        data: supplier,
    });
};

const updateSupplier = async (req, res) => {
    const validatedData = updateSupplierSchema.parse(req.body);
    const supplier = await supplierService.updateSupplier(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Supplier updated successfully",
        data: supplier,
    });
};

const updateSupplierStatus = async (req, res) => {
    const validatedData = updateSupplierStatusSchema.parse(req.body);
    const supplier = await supplierService.updateSupplierStatus(
        req.params.id,
        validatedData.status
    );

    res.status(200).json({
        success: true,
        message: "Supplier status updated successfully",
        data: supplier,
    });
};

const deleteSupplier = async (req, res) => {
    await supplierService.deleteSupplier(req.params.id);

    res.status(200).json({
        success: true,
        message: "Supplier deleted successfully",
    });
};

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    updateSupplierStatus,
    deleteSupplier,
};
