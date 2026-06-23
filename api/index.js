const mongoose = require("mongoose");
const app = require("../src/app");
const connectDB = require("../src/config/db");

module.exports = async (req, res) => {
  // Ensure database is connected before handling the request
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (err) {
      console.error("Database connection failed:", err.message);
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: err.message
      });
    }
  }
  
  // Hand over execution to the Express app
  return app(req, res);
};
