import { Router } from "express";
import { post } from "../controllers/service";

const router = Router();
router.post('/service', post)
export default router;