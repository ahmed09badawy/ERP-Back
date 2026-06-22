const MonthlyClosing = require("./monthlyClosing.model");

const closeMonth = async ({ month, year }) => {
    const exists = await MonthlyClosing.findOne({ month, year });

    if (exists) {
        const error = new Error("Month already closed");
        error.statusCode = 400;
        throw error;
    }

    return MonthlyClosing.create({ month, year });
};

const reopenMonth = async ({ month, year }) => {
    const record = await MonthlyClosing.findOne({ month, year });

    if (!record) {
        const error = new Error("Month not found");
        error.statusCode = 404;
        throw error;
    }

    await MonthlyClosing.deleteOne({ _id: record._id });

    return { message: "Month reopened successfully" };
};

const isMonthClosed = async (date) => {
    const d = new Date(date);

    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const record = await MonthlyClosing.findOne({ month, year });

    return !!record;
};

const getAllClosings = async () => {
    return MonthlyClosing.find().sort({ year: -1, month: -1 });
};

module.exports = {
    closeMonth,
    reopenMonth,
    isMonthClosed,
    getAllClosings,
};
