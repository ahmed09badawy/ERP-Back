const InsurancePolicy = require("./insurancePolicy.model");
const Employee = require("../employee/employee.model");
const generateCode = require("../../../common/utils/generate-code");
const createInsurancePolicy = async (data) => {
    const policyNumber = await generateCode("insurance_policy", "POL");

    const employee = await Employee.findById(data.employeeInfo);
    if (!employee) {
        throw new Error("Employee not found");
    }

    const policy = await InsurancePolicy.create({
        ...data,
        policyNumber,
    });

    return InsurancePolicy.findById(policy._id).populate("employeeInfo");
};

const getAllInsurancePolicies = async (query) => {
    const { page = 1, limit = 10, employeeInfo, planName, insuranceCompany } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (planName) filter.planName = planName;
    if (insuranceCompany) {
        filter.insuranceCompany = { $regex: insuranceCompany, $options: "i" };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const policies = await InsurancePolicy.find(filter)
        .populate("employeeInfo")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await InsurancePolicy.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: policies,
    };
};

const getInsurancePolicyById = async (id) => {
    const policy = await InsurancePolicy.findOne({
        _id: id,
        isDeleted: false,
    }).populate("employeeInfo");

    if (!policy) {
        throw new Error("Insurance policy not found");
    }

    return policy;
};

const updateInsurancePolicy = async (id, data) => {
    const policy = await InsurancePolicy.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!policy) {
        throw new Error("Insurance policy not found");
    }

    delete data.policyNumber;

    Object.assign(policy, data);
    await policy.save();

    return policy;
};

const deleteInsurancePolicy = async (id) => {
    const policy = await InsurancePolicy.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!policy) {
        throw new Error("Insurance policy not found");
    }

    policy.isDeleted = true;
    await policy.save();

    return true;
};

module.exports = {
    createInsurancePolicy,
    getAllInsurancePolicies,
    getInsurancePolicyById,
    updateInsurancePolicy,
    deleteInsurancePolicy,
};
