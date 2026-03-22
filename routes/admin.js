import express from "express";
import { getAdminOverview } from "../controllers/adminController.js";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.get("/overview", protect, authorize("admin"), getAdminOverview);

export default router;
