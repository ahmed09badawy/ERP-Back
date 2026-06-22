const SalesInvoice = require("../../salesInvoices/salesInvoice.model");
const Product = require("../../products/product.model");

const getSalesReport = async (query) => {
    const matchStage = {};

    if (query.fromDate && query.toDate) {
        matchStage.issuedDate = {
            $gte: new Date(query.fromDate),
            $lte: new Date(query.toDate),
        };
    }

    const data = await SalesInvoice.aggregate([
        { $match: matchStage },

        { $unwind: "$items" },

        {
            $group: {
                _id: "$items.productId",
                soldQty: { $sum: "$items.quantity" },
                soldAmount: { $sum: "$items.total" },
            },
        },

        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
            },
        },

        { $unwind: "$product" },

        {
            $project: {
                _id: 0,
                productId: "$product._id",
                sku: "$product.sku",
                productName: "$product.productName",
                category: "$product.category",
                soldQty: 1,
                soldAmount: 1,
                inStockQty: "$product.currentStock",
            },
        },

        { $sort: { soldQty: -1 } },
    ]);

    return data;
};

module.exports = {
    getSalesReport,
};
