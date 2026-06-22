const Lead = require("./lead.model");
const Counter = require("../../assets/counter.model");

const generateLeadCode = async () => {
    const counter = await Counter.findOneAndUpdate(
        { name: "lead" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    return `LED-${String(counter.seq).padStart(4, "0")}`;
};

const createLead = async (data) => {
    data.leadCode = await generateLeadCode();
    return await Lead.create(data);
};

const getAllLeads = async (query) => {
    const { page = 1, limit = 10, status } = query;

    const filter = { isDeleted: false };

    if (status) {
        filter.leadStatus = status;
    }

    const leads = await Lead.find(filter)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

    return leads;
};

const getLeadById = async (id) => {
    return await Lead.findById(id);
};

const updateLead = async (id, data) => {
    return await Lead.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

const deleteLead = async (id) => {
    return await Lead.findByIdAndUpdate(id, { isDeleted: true });
};

module.exports = {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
};
