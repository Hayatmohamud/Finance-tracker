import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import { swaggerSpecs } from "./utils/swagger.js"; // magaca saxda ah

import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

// --- 1. MIDDLEWARES ---
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", limiter);

// --- CONFIG ---
const PORT = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || "development";

const URI =
  mode === "development"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PRO;

if (!URI) {
  console.error(
    `❌ ${mode === "development" ? "MONGO_URI_DEV" : "MONGO_URI_PRO"} not found in .env`,
  );
  process.exit(1);
}

// --- Swagger ---
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Personal Finance Tracker API 🚀",
    docs: "/docs",
  });
});

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

// --- ERROR HANDLER ---
app.use(errorHandler);

// --- DB CONNECTION ---
mongoose
  .connect(URI)
  .then(() => {
    console.log(`✅ MongoDB Connected (${mode})`);
    app.listen(PORT, () => {
      console.log(`🚀 Server: http://localhost:${PORT}`);
      console.log(`📖 Docs: http://localhost:${PORT}/docs`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Error:", err.message);
  });
