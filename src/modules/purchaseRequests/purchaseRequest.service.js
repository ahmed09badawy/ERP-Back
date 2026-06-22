const PurchaseRequest = require("./purchaseRequest.model");
const generateCode = require("../../common/utils/generate-code");

const calculateItems = (items = []) => {
    return items.map((item) => ({
        productId: item.productId || null,
        itemName: item.itemName,
        requiredQuantity: item.requiredQuantity,
        estimatedUnitCost: item.estimatedUnitCost || 0,
        totalCost: item.requiredQuantity * (item.estimatedUnitCost || 0),
    }));
};

const createPurchaseRequest = async (payload, currentUserId) => {
    const prNumber = await generateCode("purchase_request", "PR");

    const pr = await PurchaseRequest.create({
        prNumber,
        requestDate: payload.requestDate || new Date(),
        department: payload.department || "",
        requestedBy: currentUserId || null,
        companyId: payload.companyId || null,
        branchId: payload.branchId || null,
        items: calculateItems(payload.items),
        status: payload.status || "PENDING",
        notes: payload.notes || "",
    });

    return PurchaseRequest.findById(pr._id).populate(
        "requestedBy companyId branchId items.productId"
    );
};

const getPurchaseRequests = async () => {
    return PurchaseRequest.find()
        .populate("requestedBy companyId branchId items.productId")
        .sort({ createdAt: -1 });
};

const getPurchaseRequestById = async (id) => {
    const pr = await PurchaseRequest.findById(id).populate(
        "requestedBy companyId branchId items.productId"
    );

    if (!pr) {
        const error = new Error("Purchase request not found");
        error.statusCode = 404;
        throw error;
    }

    return pr;
};

const updatePurchaseRequest = async (id, payload) => {
    const pr = await PurchaseRequest.findById(id);

    if (!pr) {
        const error = new Error("Purchase request not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.requestDate !== undefined) pr.requestDate = payload.requestDate;
    if (payload.department !== undefined) pr.department = payload.department;
    if (payload.companyId !== undefined) pr.companyId = payload.companyId || null;
    if (payload.branchId !== undefined) pr.branchId = payload.branchId || null;
    if (payload.items !== undefined) pr.items = calculateItems(payload.items);
    if (payload.status !== undefined) pr.status = payload.status;
    if (payload.notes !== undefined) pr.notes = payload.notes;

    await pr.save();

    return PurchaseRequest.findById(pr._id).populate(
        "requestedBy companyId branchId items.productId"
    );
};

const deletePurchaseRequest = async (id) => {
    const pr = await PurchaseRequest.findById(id);

    if (!pr) {
        const error = new Error("Purchase request not found");
        error.statusCode = 404;
        throw error;
    }

    await PurchaseRequest.findByIdAndDelete(id);

    return true;
};

module.exports = {
    createPurchaseRequest,
    getPurchaseRequests,
    getPurchaseRequestById,
    updatePurchaseRequest,
    deletePurchaseRequest,
};
