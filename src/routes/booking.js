import { Router } from "express";
import { createBooking, listBooking, read, updateStatus } from "../controllers/booking";
const router = Router();
router.post("/booking", createBooking);
router.get("/booking", listBooking);
router.get("/booking/:id", read);
router.patch("/booking/:id", updateStatus);
export default router;
