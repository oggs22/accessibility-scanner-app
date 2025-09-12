import { Router } from "express";
import { createScan, deleteScan, getScan, getScanList } from "../controllers/scanController";
import { apiKeyAuth } from "../middleware/auth";

const router = Router();

router.post("/scan", apiKeyAuth, createScan);
router.get('/scan/:id', apiKeyAuth, getScan);
router.get('/scan-list', apiKeyAuth, getScanList);
router.delete('/scan/:id', apiKeyAuth, deleteScan);

export default router;