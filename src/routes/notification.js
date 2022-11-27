import { Router } from "express";
import {
  getListAdminNotification,
  getUserListNotification,
readNotification,
} from "../controllers/notification";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
import { isAdmin } from "../middlewares/checkRole";
const router = Router();

router.get(
  "/admin-notification",
  jwtVerifyToken,
  isAdmin,
  getListAdminNotification
);
router.get("/user-notification", jwtVerifyToken, getUserListNotification);
router.put("/read-notification/:id", readNotification);
export default router;
