import express from "express";
import { getDashboardSummary } from "../controllers/adminAnalyticsController.js";
import {protect,authorize} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get("/dashboard-summary",protect,authorize("admin"),getDashboardSummary);

export default router;