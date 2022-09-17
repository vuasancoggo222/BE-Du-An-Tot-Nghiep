import { Router } from "express";
import { createService, deleteManyServices, unactiveService } from "../controllers/service";

const router = Router();
router.post('/service', createService)
router.get('/service/unactive-service',unactiveService)
router.delete('/service/delete-many-service',deleteManyServices)
export default router;