const Product = require("../../products/product.model");

const getInventoryReport = async (query) => {
    const filter = {};

    if (query.sku) {
        filter.sku = { $regex: query.sku, $options: "i" };
    }

    if (query.category) {
        filter.category = query.category;
    }

    const products = await Product.find(filter)
        .select("sku productName category defaultUnit currentStock")
        .sort({ createdAt: -1 });

    const data = products.map((item) => ({
        sku: item.sku,
        productName: item.productName,
        category: item.category,
        unit: item.defaultUnit,
        inStockQty: item.currentStock || 0,
    }));

    return data;
};

module.exports = {
    getInventoryReport,
};
