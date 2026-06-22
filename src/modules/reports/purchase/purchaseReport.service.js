const PurchaseInvoice = require("../../purchaseInvoices/purchaseInvoice.model");

const getPurchaseReport = async (query) => {
    const matchStage = {};

    if (query.fromDate && query.toDate) {
        matchStage.invoiceDate = {
            $gte: new Date(query.fromDate),
            $lte: new Date(query.toDate),
        };
    }

    const data = await PurchaseInvoice.aggregate([
        { $match: matchStage },

        { $unwind: "$items" },

        {
            $group: {
                _id: {
                    productId: "$items.productId",
                    invoiceNo: "$invoiceNo",
                },
                purchaseQty: { $sum: "$items.quantity" },
                purchaseAmount: { $sum: "$items.total" },
            },
        },

        {
            $lookup: {
                from: "products",
                localField: "_id.productId",
                foreignField: "_id",
                as: "product",
            },
        },

        { $unwind: "$product" },

        {
            $project: {
                _id: 0,
                reference: "$_id.invoiceNo",
                sku: "$product.sku",
                productName: "$product.productName",
                category: "$product.category",
                purchaseQty: 1,
                purchaseAmount: 1,
                inStockQty: "$product.currentStock",
            },
        },

        { $sort: { purchaseQty: -1 } },
    ]);

    return data;
};

module.exports = {
    getPurchaseReport,
};
