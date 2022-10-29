import { Router } from "express";
import { getListAdminNotification } from "../controllers/notification";
const router = Router()

router.get('/notification',getListAdminNotification)

export default router