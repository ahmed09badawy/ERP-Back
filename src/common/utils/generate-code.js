const Counter = require("../../modules/assets/counter.model");

const generateCode = async (name, prefix) => {
    const counter = await Counter.findOneAndUpdate(
        { name },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
    );

    const number = counter.seq.toString().padStart(4, "0");
    return `${prefix}-${number}`;
};

module.exports = generateCode;
