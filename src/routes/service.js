import { Router } from "express";
import { createService, list, remove, unactiveService, update } from "../controllers/service";

const router = Router();
router.get('/service', list)
router.post('/service', createService)
router.patch('/service/:id', update)
router.delete('/service/:id', remove)
router.get('/service/unactive-service',unactiveService)
export default router;