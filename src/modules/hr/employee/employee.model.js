const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        employeeCode: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        code: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        photo: {
            type: String,
            trim: true,
            default: "",
        },
        contractStartDate: {
            type: Date,
            default: null
        },
        contractEndDate: {
            type: Date,
            default: null
        },

        idNumber: {
            type: String,
            trim: true,
            default: "",
        },

        nationality: {
            type: String,
            trim: true,
            default: "",
        },
        gosiId: {
            type: String,
            trim: true,
            default: ""
        },

        birthDate: {
            type: Date,
            default: null,
        },

        gender: {
            type: String,
            enum: ["MALE", "FEMALE"],
            default: null,
        },

        maritalStatus: {
            type: String,
            enum: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"],
            default: null,
        },

        phoneNumber: {
            type: String,
            trim: true,
            default: "",
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },

        employeeStatus: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "ON_LEAVE", "TERMINATED"],
            default: "ACTIVE",
        },
        terminationDate : {
            type : Date,
            default : null
        },

        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },

        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },

        directManagerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            default: null,
        },

        hireDate: {
            type: Date,
            default: null,
        },

        contractType: {
            type: String,
            enum: ["PERMANENT", "TEMPORARY", "INTERN", "PART_TIME"],
            default: null,
        },

        internalEmployeeNumber: {
            type: String,
            trim: true,
            default: "",
        },

        jobGrade: {
            type: String,
            trim: true,
            default: "",
        },

        bankInfo: {
            bankName: {
                type: String,
                trim: true,
                default: "",
            },
            accountNumber: {
                type: String,
                trim: true,
                default: "",
            },
        },
        documents: [
            {
                documentType: String,
                documentNumber: String,
                issueDate: Date,
                expiryDate: Date,
            }
        ],
    },

    { timestamps: true }
);

employeeSchema.index({ employeeCode: 1 }, { unique: true });
employeeSchema.index({ email: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Employee", employeeSchema);
