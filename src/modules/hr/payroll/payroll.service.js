const Payroll = require("./payroll.model");
const Employee = require("../employee/employee.model");
const PayrollFileLog = require("../../hr/payrollFileLogs/payrollFileLog.models");
const generateCode = require("../../../common/utils/generate-code");

const calculatePayrollTotals = (payload) => {
    const overtimeAmount = (payload.overtimeHours || 0) * (payload.overtimeRate || 0);

    const totalAllowances =
        (payload.housingAllowance || 0) +
        (payload.transportAllowance || 0) +
        (payload.workNatureAllowance || 0) +
        (payload.medicalAllowance || 0) +
        (payload.commissions || 0) +
        (payload.bonus || 0) +
        overtimeAmount;

    const totalDeductions =
        (payload.deductions?.absence || 0) +
        (payload.deductions?.lateArrival || 0) +
        (payload.deductions?.earlyLeave || 0) +
        (payload.deductions?.loan || 0) +
        (payload.deductions?.penalties || 0) +
        (payload.deductions?.other || 0);

    const grossSalary = (payload.basicSalary || 0) + totalAllowances;
    const netSalary = grossSalary - totalDeductions;

    return {
        overtimeAmount,
        totalAllowances,
        totalDeductions,
        grossSalary,
        netSalary: netSalary > 0 ? netSalary : 0,
    };
};

const createPayroll = async (payload) => {
    const payrollCode = await generateCode("payroll", "PAY");

    const employee = await Employee.findById(payload.employeeId);
    if (!employee) {
        const error = new Error("Employee not found");
        error.statusCode = 404;
        throw error;
    }

    const existingPayroll = await Payroll.findOne({
        employeeId: payload.employeeId,
        payrollMonth: payload.payrollMonth,
        payrollYear: payload.payrollYear,
    });

    if (existingPayroll) {
        const error = new Error("Payroll already exists for this employee in this month");
        error.statusCode = 400;
        throw error;
    }

    const totals = calculatePayrollTotals(payload);

    const payroll = await Payroll.create({
        ...payload,
        payrollCode,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
        overtimeAmount: totals.overtimeAmount,
        totalAllowances: totals.totalAllowances,
        totalDeductions: totals.totalDeductions,
        grossSalary: totals.grossSalary,
        netSalary: totals.netSalary,
    });

    await PayrollFileLog.create({
        payrollRunId: await generateCode("payroll_run", "PR"),
        month: `${payload.payrollMonth}-${payload.payrollYear}`,
        runBy: payload.createdBy || payload.employeeId,
        numberOfEmployees: 1,
        totalPayroll: totals.netSalary,
        status: "SUCCESS",
        notes: `Payroll created for ${employee.fullName || employee.name}`,
    });

    return Payroll.findById(payroll._id).populate("employeeId companyId branchId");
};

const getPayrolls = async () => {
    return Payroll.find()
        .populate("employeeId companyId branchId")
        .sort({ payrollYear: -1, payrollMonth: -1, createdAt: -1 });
};

const getPayrollById = async (id) => {
    const payroll = await Payroll.findById(id).populate("employeeId companyId branchId");

    if (!payroll) {
        const error = new Error("Payroll not found");
        error.statusCode = 404;
        throw error;
    }

    return payroll;
};

const updatePayroll = async (id, payload) => {
    const payroll = await Payroll.findById(id);

    if (!payroll) {
        const error = new Error("Payroll not found");
        error.statusCode = 404;
        throw error;
    }

    delete payload.payrollCode;

    if (payload.employeeId) {
        const employee = await Employee.findById(payload.employeeId);
        if (!employee) {
            const error = new Error("Employee not found");
            error.statusCode = 404;
            throw error;
        }
        payroll.employeeId = payload.employeeId;
    }

    if (payload.companyId !== undefined) payroll.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) payroll.branchId = payload.branchId || null;
    if (payload.payrollMonth !== undefined) payroll.payrollMonth = payload.payrollMonth;
    if (payload.payrollYear !== undefined) payroll.payrollYear = payload.payrollYear;
    if (payload.basicSalary !== undefined) payroll.basicSalary = payload.basicSalary;
    if (payload.housingAllowance !== undefined) payroll.housingAllowance = payload.housingAllowance;
    if (payload.transportAllowance !== undefined) payroll.transportAllowance = payload.transportAllowance;
    if (payload.workNatureAllowance !== undefined) payroll.workNatureAllowance = payload.workNatureAllowance;
    if (payload.medicalAllowance !== undefined) payroll.medicalAllowance = payload.medicalAllowance;
    if (payload.commissions !== undefined) payroll.commissions = payload.commissions;
    if (payload.bonus !== undefined) payroll.bonus = payload.bonus;
    if (payload.overtimeHours !== undefined) payroll.overtimeHours = payload.overtimeHours;
    if (payload.overtimeRate !== undefined) payroll.overtimeRate = payload.overtimeRate;
    if (payload.deductions !== undefined) payroll.deductions = payload.deductions;
    if (payload.status !== undefined) payroll.status = payload.status;
    if (payload.notes !== undefined) payroll.notes = payload.notes;

    const totals = calculatePayrollTotals({
        basicSalary: payroll.basicSalary,
        housingAllowance: payroll.housingAllowance,
        transportAllowance: payroll.transportAllowance,
        workNatureAllowance: payroll.workNatureAllowance,
        medicalAllowance: payroll.medicalAllowance,
        commissions: payroll.commissions,
        bonus: payroll.bonus,
        overtimeHours: payroll.overtimeHours,
        overtimeRate: payroll.overtimeRate,
        deductions: payroll.deductions,
    });

    payroll.overtimeAmount = totals.overtimeAmount;
    payroll.totalAllowances = totals.totalAllowances;
    payroll.totalDeductions = totals.totalDeductions;
    payroll.grossSalary = totals.grossSalary;
    payroll.netSalary = totals.netSalary;

    await payroll.save();

    return Payroll.findById(payroll._id).populate("employeeId companyId branchId");
};

const deletePayroll = async (id) => {
    const payroll = await Payroll.findByIdAndDelete(id);

    if (!payroll) {
        const error = new Error("Payroll not found");
        error.statusCode = 404;
        throw error;
    }

    return { message: "Payroll deleted successfully" };
};

module.exports = {
    createPayroll,
    getPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll,
};
