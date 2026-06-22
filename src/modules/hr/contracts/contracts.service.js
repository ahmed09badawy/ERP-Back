const Contract = require("./contracts.model");
const generateCode = require("../../../common/utils/generate-code");

const createContract = async (data) => {
    const contractId = await generateCode("contract", "CON");

    const contract = await Contract.create({
        ...data,
        contractId,
    });

    return contract;
};

const getAllContracts = async (query) => {
    const { page = 1, limit = 10, employeeInfo, state } = query;

    const filter = { isDeleted: false };

    if (employeeInfo) filter.employeeInfo = employeeInfo;
    if (state) filter.state = state;

    const skip = (page - 1) * limit;

    const contracts = await Contract.find(filter)
        .populate("employeeInfo")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Contract.countDocuments(filter);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        data: contracts,
    };
};

const getContractById = async (id) => {
    const contract = await Contract.findOne({
        _id: id,
        isDeleted: false,
    }).populate("employeeInfo");

    if (!contract) throw new Error("Contract not found");

    return contract;
};

const updateContract = async (id, data) => {
    const contract = await Contract.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!contract) throw new Error("Contract not found");

    delete data.contractId;

    Object.assign(contract, data);
    await contract.save();

    return contract;
};

const deleteContract = async (id) => {
    const contract = await Contract.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!contract) throw new Error("Contract not found");

    contract.isDeleted = true;
    await contract.save();

    return true;
};

module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract,
};
