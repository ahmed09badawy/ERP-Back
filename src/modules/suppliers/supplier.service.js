const Supplier = require("./supplier.model");
const generateCode = require("../../common/utils/generate-code");

const createSupplier = async (payload) => {
    const supplierCode = await generateCode("supplier", "SUP");

    const supplier = await Supplier.create({
        ...payload,
        supplierCode,
        code: supplierCode,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
    });

    return Supplier.findById(supplier._id).populate("companyId branchId");
};

const getSuppliers = async () => {
    return Supplier.find()
        .populate("companyId branchId")
        .sort({ createdAt: -1 });
};

const getSupplierById = async (id) => {
    const supplier = await Supplier.findById(id).populate("companyId branchId");

    if (!supplier) {
        const error = new Error("Supplier not found");
        error.statusCode = 404;
        throw error;
    }

    return supplier;
};

const updateSupplier = async (id, payload) => {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
        const error = new Error("Supplier not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.supplierName !== undefined) supplier.supplierName = payload.supplierName;
    if (payload.phoneNumber !== undefined) supplier.phoneNumber = payload.phoneNumber;
    if (payload.email !== undefined) supplier.email = payload.email;
    if (payload.address !== undefined) supplier.address = payload.address;
    if (payload.paymentTerms !== undefined) supplier.paymentTerms = payload.paymentTerms;
    if (payload.companyName !== undefined) supplier.companyName = payload.companyName;
    if (payload.companyId !== undefined) supplier.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) supplier.branchId = payload.branchId || null;
    if (payload.status !== undefined) supplier.status = payload.status;

    await supplier.save();

    return Supplier.findById(supplier._id).populate("companyId branchId");
};

const updateSupplierStatus = async (id, status) => {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
        const error = new Error("Supplier not found");
        error.statusCode = 404;
        throw error;
    }

    supplier.status = status;
    await supplier.save();

    return Supplier.findById(supplier._id).populate("companyId branchId");
};

const deleteSupplier = async (id) => {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
        const error = new Error("Supplier not found");
        error.statusCode = 404;
        throw error;
    }

    await Supplier.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    updateSupplierStatus,
    deleteSupplier,
};
