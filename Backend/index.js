import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

// ✅ CORS: allow only frontend domain in production
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI; // 🔑 double-check this name in .env

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

connectDB();

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
