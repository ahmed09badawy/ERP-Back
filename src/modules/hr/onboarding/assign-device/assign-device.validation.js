const { z } = require("zod");

const createAssignDeviceSchema = z.object({
    employeeInfo: z.string(),
    deviceType: z.string(),
    serialNumber: z.string(),
    doneBy: z.string(),
    status: z.enum(["Pending", "Done", "Canceled"]).optional(),
    doneAt: z.string().optional(),
});

const updateAssignDeviceSchema = createAssignDeviceSchema.partial();

module.exports = {
    createAssignDeviceSchema,
    updateAssignDeviceSchema,
};
