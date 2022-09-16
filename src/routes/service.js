import { Router } from "express";
import { createService } from "../controllers/service";

const router = Router();
router.post('/service', createService)
export default router;