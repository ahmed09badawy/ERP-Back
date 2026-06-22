const ContactGroup = require("./group.model");

const createGroup = async (payload) => {
    const existing = await ContactGroup.findOne({ name: payload.name, isDeleted: false });
    if (existing) {
        const error = new Error("Group name already exists");
        error.statusCode = 400;
        throw error;
    }
    return await ContactGroup.create(payload);
};

const getAllGroups = async (query = {}) => {
    const filter = { isDeleted: false };
    if (query.name) {
        filter.name = { $regex: query.name, $options: "i" };
    }
    return await ContactGroup.find(filter).sort({ name: 1 });
};

const getGroupById = async (id) => {
    const group = await ContactGroup.findOne({ _id: id, isDeleted: false });
    if (!group) {
        const error = new Error("Group not found");
        error.statusCode = 404;
        throw error;
    }
    return group;
};

const updateGroup = async (id, payload) => {
    const group = await ContactGroup.findOneAndUpdate(
        { _id: id, isDeleted: false },
        payload,
        { returnDocument: "after" }
    );
    if (!group) {
        const error = new Error("Group not found");
        error.statusCode = 404;
        throw error;
    }
    return group;
};

const deleteGroup = async (id) => {
    const group = await ContactGroup.findOneAndUpdate(
        { _id: id },
        { isDeleted: true },
        { returnDocument: "after" }
    );
    if (!group) {
        const error = new Error("Group not found");
        error.statusCode = 404;
        throw error;
    }
    return { message: "Group deleted successfully" };
};

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
};
