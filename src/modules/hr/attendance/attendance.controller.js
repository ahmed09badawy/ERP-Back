const service = require("./attendance.service");
const { createAttendanceSchema, updateAttendanceSchema } = require("./attendance.validation");

const createAttendance = async (req, res) => {
    const validatedData = createAttendanceSchema.parse(req.body);
    const result = await service.createAttendance(validatedData);

    res.status(201).json({
        success: true,
        message: "Attendance created successfully",
        data: result,
    });
};

const getAttendanceList = async (req, res) => {
    const result = await service.getAttendanceList();

    res.status(200).json({
        success: true,
        data: result,
    });
};

const getAttendanceById = async (req, res) => {
    const result = await service.getAttendanceById(req.params.id);

    res.status(200).json({
        success: true,
        data: result,
    });
};

const updateAttendance = async (req, res) => {
    const validatedData = updateAttendanceSchema.parse(req.body);
    const result = await service.updateAttendance(req.params.id, validatedData);

    res.status(200).json({
        success: true,
        message: "Attendance updated successfully",
        data: result,
    });
};

const deleteAttendance = async (req, res) => {
    await service.deleteAttendance(req.params.id);

    res.status(200).json({
        success: true,
        message: "Attendance record deleted successfully",
    });
};

module.exports = {
    createAttendance,
    getAttendanceList,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
};
