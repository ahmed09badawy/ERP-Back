const service = require("./hire.service");
const { createHireSchema, updateHireSchema } = require("./hire.validation");

const createHire = async (req, res) => {
    const validatedData = createHireSchema.parse(req.body);
    const result = await service.createHire(validatedData);

    res.status(201).json({
        success: true,
        message: "Hire record created successfully",
        data: result,
    });
};

const getHires = async (req, res) => {
    const result = await service.getHires();

    res.status(200).json({
        success: true,
        message: "Hire records retrieved successfully",
        data: result,
    });
};

const getHireById = async (req, res) => {
    const result = await service.getHireById(req.params.id);

    res.status(200).json({
        success: true,
        message: "Hire record details retrieved successfully",
        data: result,
    });
};

const updateHire = async (req, res) => {
    const validatedData = updateHireSchema.parse(req.body);
    const result = await service.updateHire(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Hire record updated successfully",
        data: result,
    });
};

const deleteHire = async (req, res) => {
    await service.deleteHire(req.params.id);

    res.status(200).json({
        success: true,
        message: "Hire record deleted successfully",
    });
};

module.exports = {
    createHire,
    getHires,
    getHireById,
    updateHire,
    deleteHire,
};
