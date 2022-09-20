import { Router } from "express";
import { createBooking, getEmployeeByDate, listBooking } from "../controllers/booking";
const router = Router();
router.post("/booking", createBooking);
router.get("/booking", listBooking);
router.get('/booking/get-employee-by-date',getEmployeeByDate)
export default router;
