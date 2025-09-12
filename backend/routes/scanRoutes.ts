import { Router } from "express";
import { createScan } from "../controllers/scanController";
import { apiKeyAuth } from "../middleware/auth";

const router = Router();

router.post("/scan", apiKeyAuth, createScan);

export default router;