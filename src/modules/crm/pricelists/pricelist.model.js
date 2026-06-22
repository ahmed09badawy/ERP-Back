const mongoose = require("mongoose");

const pricelistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        nameEn: {
            type: String,
            trim: true,
        },
        currencyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Currency",
            required: true,
        },
        discountPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "inventoryProduct",
                },
                fixedPrice: {
                    type: Number,
                },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Pricelist", pricelistSchema);
