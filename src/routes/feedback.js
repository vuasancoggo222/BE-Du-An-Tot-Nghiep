import { Router } from "express";
import { serviceFeedback } from "../controllers/feedback";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
const router = Router()

router.post('/feedback/service',jwtVerifyToken,serviceFeedback)

export default router