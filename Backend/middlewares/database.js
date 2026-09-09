const mongoose = require("mongoose");

let connectionPromise;

const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    }).finally(() => {
      connectionPromise = undefined;
    });
  }

  await connectionPromise;
};

const requireDatabase = async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.name);
    res.set("Retry-After", "5");
    res.status(503).json({ message: "Database temporarily unavailable. Please try again." });
  }
};

module.exports = { connectDatabase, requireDatabase };
