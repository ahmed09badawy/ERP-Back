const mongoose = require("mongoose");

const supplierRatingSchema = new mongoose.Schema(
    {
        ratingCode: {
            type: String,
            trim: true,
            uppercase: true,
            unique: true,
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
        quality: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        delivery: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        service: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        compliance: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        overallRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

supplierRatingSchema.index({ supplierId: 1 });

module.exports = mongoose.model("SupplierRating", supplierRatingSchema);
