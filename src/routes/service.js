import { Router } from "express";
import { createService, unactiveService } from "../controllers/service";

const router = Router();
router.post('/service', createService)
router.get('/service/unactive-service',unactiveService)
export default router;