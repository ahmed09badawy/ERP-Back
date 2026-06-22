const SalesInvoice = require("../../salesInvoices/salesInvoice.model");

const getCustomerReport = async (query = {}) => {
    const matchStage = {};

    if (query.fromDate && query.toDate) {
        matchStage.issuedDate = {
            $gte: new Date(query.fromDate),
            $lte: new Date(query.toDate),
        };
    }

    const data = await SalesInvoice.aggregate([
        { $match: matchStage },

        {
            $group: {
                _id: {
                    customerId: "$customerId",
                    paymentStatus: "$paymentStatus",
                },
                reference: { $first: "$invoiceNumber" },
                totalOrders: { $sum: 1 },
                amount: { $sum: "$totalAmount" },
            },
        },

        {
            $lookup: {
                from: "customers",
                localField: "_id.customerId",
                foreignField: "_id",
                as: "customer",
            },
        },

        { $unwind: "$customer" },

        {
            $project: {
                _id: 0,
                reference: 1,
                code: "$customer.customerCode",
                customerInfo: "$customer.customerName",
                totalOrders: 1,
                amount: 1,
                paymentMethod: "$_id.paymentStatus",
            },
        },

        { $sort: { totalOrders: -1 } },
    ]);

    return data;
};

module.exports = {
    getCustomerReport,
};
