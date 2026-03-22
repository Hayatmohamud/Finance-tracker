import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { setupSwagger } from "./utils/swagger.js";


import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import {  errorHandler } from "./middlewares/errorHandler.js";
// Swagger
setupSwagger(app);

dotenv.config();
const app = express();

// --- 1. MIDDLEWARES (Amniga iyo Xogta) ---
app.use(express.json()); // Si uu u akhriyo JSON-ka Postman
app.use(helmet());       // Amniga Headers-ka
app.use(cors());         // In meelo kale laga soo wici karo
app.use(morgan("dev"));  // Inaan aragno request kasta oo soo dhaca

// Xaddididda inta jeer ee la soo wici karo (Rate Limiting)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 daqiiqo
    max: 100 // 100 jeer kaliya IP kasta
});
app.use('/api', limiter); // Kaliya API routes-ka ayuu xaddidayaa

// Basic Route
app.get("/", (req, res) => {
  res.send("Personal Finance Tracker API is running...");
});

// Routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);



// Error Handling
app.use(errorHandler);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI_DEV)
  .then(() => console.log("✅ MongoDB is connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
