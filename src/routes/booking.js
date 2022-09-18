import { Router } from "express";
import { createBooking, listBooking } from "../controllers/booking";
const router = Router();
router.post("/booking", createBooking);
router.get("/booking", listBooking);
export default router;
