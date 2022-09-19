import { Router } from "express";
import { createService, list, unactiveService } from "../controllers/service";

const router = Router();
router.get('/service', list)
router.post('/service', createService)
router.get('/service/unactive-service',unactiveService)
export default router;