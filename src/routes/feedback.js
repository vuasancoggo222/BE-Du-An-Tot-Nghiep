import { Router } from "express";
import { listFeedBackByService, serviceFeedback } from "../controllers/feedback";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
const router = Router()

router.post('/feedback/service',jwtVerifyToken,serviceFeedback)
router.get('/feedback/service/:svid',listFeedBackByService)
export default router