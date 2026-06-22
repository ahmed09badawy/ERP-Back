const customerService = require("./customer.service");
const {
    createCustomerSchema,
    updateCustomerSchema,
    updateCustomerStatusSchema,
} = require("./customer.validation");

const createCustomer = async (req, res) => {
    const validatedData = createCustomerSchema.parse(req.body);
    const customer = await customerService.createCustomer(validatedData);

    res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: customer,
    });
};

const getCustomers = async (req, res) => {
    const customers = await customerService.getCustomers();

    res.status(200).json({
        success: true,
        data: customers,
    });
};

const getCustomerById = async (req, res) => {
    const customer = await customerService.getCustomerById(req.params.id);

    res.status(200).json({
        success: true,
        data: customer,
    });
};

const updateCustomer = async (req, res) => {
    const validatedData = updateCustomerSchema.parse(req.body);
    const customer = await customerService.updateCustomer(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Customer updated successfully",
        data: customer,
    });
};

const updateCustomerStatus = async (req, res) => {
    const validatedData = updateCustomerStatusSchema.parse(req.body);
    const customer = await customerService.updateCustomerStatus(
        req.params.id,
        validatedData.status
    );

    res.status(200).json({
        success: true,
        message: "Customer status updated successfully",
        data: customer,
    });
};

const deleteCustomer = async (req, res) => {
    await customerService.deleteCustomer(req.params.id);

    res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
    });
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    updateCustomerStatus,
    deleteCustomer,
};
