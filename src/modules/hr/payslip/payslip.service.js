const Payslip = require("./payslip.model");
const Employee = require("../employee/employee.model");
const generateCode = require("../../../common/utils/generate-code");

const calculatePayslip = (data) => {
    const basicSalary = data.basicSalary || 0;
    const housingAllowance = data.housingAllowance || 0;
    const transportAllowance = data.transportAllowance || 0;
    const natureAllowance = data.natureAllowance || 0;
    const commissions = data.commissions || 0;
    const bonuses = data.bonuses || 0;
    const bonus = data.bonus || 0;
    const overtimeHours = data.overtimeHours || 0;
    const hrdfSupport = data.hrdfSupport || 0;

    const gosiEmployee = data.gosiEmployee || 0;
    const loan = data.loan || 0;
    const sanedDeduction = data.sanedDeduction || 0;
    const penalties = data.penalties || 0;
    const absence = data.absence || 0;
    const earlyLeave = data.earlyLeave || 0;

    const totalEarnings =
        basicSalary +
        housingAllowance +
        transportAllowance +
        natureAllowance +
        commissions +
        bonuses +
        bonus +
        overtimeHours +
        hrdfSupport;

    const totalDeductions =
        gosiEmployee +
        loan +
        sanedDeduction +
        penalties +
        absence +
        earlyLeave;

    data.totalDeductions = totalDeductions;
    data.netSalary = totalEarnings - totalDeductions;

    return data;
};

const createPayslip = async (data) => {
    const payslipCode = await generateCode("payslip", "PSLIP");

    const employee = await Employee.findById(data.employeeInfo);
    if (!employee) {
        throw new Error("Employee not found");
    }

    const calculatedData = calculatePayslip({
        ...data,
        payslipCode,
    });

    const payslip = await Payslip.create(calculatedData);

    return Payslip.findById(payslip._id).populate("employeeInfo");
};

const getAllPayslips = async (query) => {
    const { page = 1, limit = 10, employeeInfo, paymentStatus, salaryMonth } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (salaryMonth) filter.salaryMonth = salaryMonth;

    const skip = (Number(page) - 1) * Number(limit);

    const payslips = await Payslip.find(filter)
        .populate("employeeInfo")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Payslip.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: payslips,
    };
};

const getPayslipById = async (id) => {
    const payslip = await Payslip.findOne({ _id: id, isDeleted: false })
        .populate("employeeInfo");

    if (!payslip) {
        throw new Error("Payslip not found");
    }

    return payslip;
};

const updatePayslip = async (id, data) => {
    const payslip = await Payslip.findOne({ _id: id, isDeleted: false });

    if (!payslip) {
        throw new Error("Payslip not found");
    }

    delete data.payslipCode;

    if (data.employeeInfo) {
        const employee = await Employee.findById(data.employeeInfo);
        if (!employee) {
            throw new Error("Employee not found");
        }
    }

    Object.assign(payslip, data);

    const calculatedData = calculatePayslip(payslip);
    Object.assign(payslip, calculatedData);

    await payslip.save();

    return Payslip.findById(payslip._id).populate("employeeInfo");
};

const deletePayslip = async (id) => {
    const payslip = await Payslip.findOne({ _id: id, isDeleted: false });

    if (!payslip) {
        throw new Error("Payslip not found");
    }

    payslip.isDeleted = true;
    await payslip.save();

    return true;
};

module.exports = {
    createPayslip,
    getAllPayslips,
    getPayslipById,
    updatePayslip,
    deletePayslip,
};
