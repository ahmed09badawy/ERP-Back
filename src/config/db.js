const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
    if (connectionPromise) return connectionPromise;

    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000,
        socketTimeoutMS: 8000,
    });

    try {
        await connectionPromise;
        console.log("MongoDB connected");
    } catch (err) {
        connectionPromise = null; // reset so next request retries
        throw err;
    }
};

module.exports = connectDB;
