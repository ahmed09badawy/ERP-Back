const service = require("./loan.service");
const {
    createLoanSchema,
    updateLoanSchema,
} = require("./loan.validation");

const createLoan = async (req, res) => {
    const validated = createLoanSchema.parse(req.body);
    const result = await service.createLoan(validated);

    res.status(201).json({
        success: true,
        message: "Loan created successfully",
        data: result,
    });
};

const getAllLoans = async (req, res) => {
    const result = await service.getAllLoans(req.query);

    res.status(200).json({
        success: true,
        count: result.data.length,
        data: result,
    });
};

const getLoanById = async (req, res) => {
    const result = await service.getLoanById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateLoan = async (req, res) => {
    const validated = updateLoanSchema.parse(req.body);
    const result = await service.updateLoan(req.params.id, validated);

    res.status(200).json({
        success: true,
        message: "Loan updated successfully",
        data: result,
    });
};

const deleteLoan = async (req, res) => {
    await service.deleteLoan(req.params.id);

    res.status(200).json({
        success: true,
        message: "Loan deleted successfully",
    });
};

module.exports = {
    createLoan,
    getAllLoans,
    getLoanById,
    updateLoan,
    deleteLoan,
};
