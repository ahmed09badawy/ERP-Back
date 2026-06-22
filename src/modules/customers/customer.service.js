const Customer = require("./customer.model");
const generateCode = require("../../common/utils/generate-code");

const createCustomer = async (payload) => {
    const customerCode = await generateCode("customer", "CUS");

    const customer = await Customer.create({
        ...payload,
        customerCode,
        code: customerCode,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
    });

    return Customer.findById(customer._id).populate("companyId branchId");
};

const getCustomers = async () => {
    return Customer.find()
        .populate("companyId branchId")
        .sort({ createdAt: -1 });
};

const getCustomerById = async (id) => {
    const customer = await Customer.findById(id).populate("companyId branchId");

    if (!customer) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
    }

    return customer;
};

const updateCustomer = async (id, payload) => {
    const customer = await Customer.findById(id);

    if (!customer) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.customerName) customer.customerName = payload.customerName;
    if (payload.phoneNumber !== undefined) customer.phoneNumber = payload.phoneNumber;
    if (payload.email !== undefined) customer.email = payload.email;
    if (payload.address !== undefined) customer.address = payload.address;
    if (payload.companyName !== undefined) customer.companyName = payload.companyName;
    if (payload.companyId !== undefined) customer.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) customer.branchId = payload.branchId || null;
    if (payload.status) customer.status = payload.status;

    await customer.save();

    return Customer.findById(customer._id).populate("companyId branchId");
};

const updateCustomerStatus = async (id, status) => {
    const customer = await Customer.findById(id);

    if (!customer) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
    }

    customer.status = status;
    await customer.save();

    return Customer.findById(customer._id).populate("companyId branchId");
};

const deleteCustomer = async (id) => {
    const customer = await Customer.findById(id);

    if (!customer) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
    }

    await customer.deleteOne();

    return { message: "Customer deleted successfully" };
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    updateCustomerStatus,
    deleteCustomer,
};
