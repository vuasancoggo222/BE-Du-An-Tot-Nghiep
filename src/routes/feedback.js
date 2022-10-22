import { Router } from "express";
import { adminReplyFeedback, listFeedBackByService, serviceFeedback } from "../controllers/feedback";
import { isAdmin } from "../middlewares/checkRole";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
const router = Router()

router.post('/feedback/service',jwtVerifyToken,serviceFeedback)
router.get('/feedback/service/:svid',listFeedBackByService)
router.put('/reply-feedback/service/:id',jwtVerifyToken,isAdmin,adminReplyFeedback)
export default router