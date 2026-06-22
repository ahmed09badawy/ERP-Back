const xlsx = require("xlsx");
const fs = require("fs");

const parseExcel = (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData = xlsx.utils.sheet_to_json(worksheet);

        const allowedKeysMap = {
            "name": ["name", "contactname", "customername", "suppliername", "fullname", "الاسم"],
            "email": ["email", "emailaddress", "البريد"],
            "phone": ["phone", "phonenumber", "mobile", "الهاتف", "الجوال"],
            "isCustomer": ["iscustomer", "customer", "عميل"],
            "isSupplier": ["issupplier", "supplier", "مورد"],
            "address": ["address", "location", "العنوان"],
            "notes": ["notes", "description", "ملاحظات"]
        };

        const normalizedData = rawData.map(row => {
            const cleanRow = {};

            
            for (const excelHeader in row) {
                const normalizedHeader = excelHeader.toLowerCase().replace(/\s+/g, "");

               
                for (const [systemKey, aliases] of Object.entries(allowedKeysMap)) {
                    if (aliases.includes(normalizedHeader)) {
                        cleanRow[systemKey] = row[excelHeader];
                        break; 
                    }
                }

            }
            return cleanRow;
        });

        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return normalizedData;
    } catch (error) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        throw new Error("Failed to parse Excel file: " + error.message);
    }
};

const genericImport = async (data, processRowFunc, validationSchema = null) => {
    const results = {
        success: [],
        errors: [],
        total: data.length,
    };

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        try {

            let validatedData = row;
            if (validationSchema) {
                validatedData = validationSchema.parse(row);
            }

            const result = await processRowFunc(validatedData);
            results.success.push({ row: i + 1, id: result._id });
        } catch (error) {
            results.errors.push({
                row: i + 1,
                error: error.message,
                data: row
            });
        }
    }

    return results;
};

module.exports = {
    parseExcel,
    genericImport,
};
