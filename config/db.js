const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/blogDB");

    const db = mongoose.connection;

    // ✅ Connection successful
    db.once("open", () => console.log("Connected to MongoDB"));

    // ❌ Connection error
    db.on("error", (err) =>
      console.error("MongoDB connection error:", err)
    );

    // ⚠️ Disconnected
    db.on("disconnected", () =>
      console.log("Disconnected from MongoDB")
    );

  } catch (err) {
    console.error("Error connecting:", err);
  }
};

module.exports = connectDB;