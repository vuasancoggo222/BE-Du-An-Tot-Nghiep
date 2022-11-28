import { Router } from "express";
import {
readNotification,
} from "../controllers/notification";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
import { isAdmin } from "../middlewares/checkRole";
const router = Router();


router.put("/read-notification/:id", readNotification);
export default router;
