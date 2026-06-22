const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        contactCode: {
            type: String,
            unique: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        nameEn: {
            type: String,
            trim: true,
        },

        companyName: {
            type: String,
            trim: true,
        },

        companyNameEn: {
            type: String,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        mobile: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
        },

        address: {
            type: String,
            trim: true,
        },

        notes: {
            type: String,
            trim: true,
        },

        isCustomer: {
            type: Boolean,
            default: false,
        },

        isSupplier: {
            type: Boolean,
            default: false,
        },

        receivableAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
        },

        payableAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChartOfAccount",
        },

        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ContactGroup",
        },

        pricelistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pricelist",
        },

        tags: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
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

module.exports = mongoose.model("Contact", contactSchema);
