const SalesSettings = require("./salesSettings.model");

const getSettings = async () => {
    let settings = await SalesSettings.findOne();

    if (!settings) {
        settings = await SalesSettings.create({});
    }

    return settings;
};

const updateSettings = async (payload) => {
    let settings = await SalesSettings.findOne();

    if (!settings) {
        settings = await SalesSettings.create(payload);
        return settings;
    }

    if (payload.vatPercentage !== undefined)
        settings.vatPercentage = payload.vatPercentage;

    if (payload.invoiceNumberingMethod !== undefined)
        settings.invoiceNumberingMethod = payload.invoiceNumberingMethod;

    if (payload.defaultPricelist !== undefined)
        settings.defaultPricelist = payload.defaultPricelist;

    if (payload.defaultPaymentTerms !== undefined)
        settings.defaultPaymentTerms = payload.defaultPaymentTerms;

    if (payload.defaultCurrency !== undefined)
        settings.defaultCurrency = payload.defaultCurrency;

    if (payload.allowReturnsWithoutInvoice !== undefined)
        settings.allowReturnsWithoutInvoice = payload.allowReturnsWithoutInvoice;

    if (payload.allowSellingOutOfStock !== undefined)
        settings.allowSellingOutOfStock = payload.allowSellingOutOfStock;

    await settings.save();

    return settings;
};

module.exports = {
    getSettings,
    updateSettings,
};
