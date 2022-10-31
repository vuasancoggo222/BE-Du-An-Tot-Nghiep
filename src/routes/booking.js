import { Router } from "express";
import { bookingGenderStatistics, createBooking, employeeBookingList, listBooking, read, updateStatus, userBookingList } from "../controllers/booking";
import { firebaseVerifyIdToken } from "../middlewares/firebaseVerifyIdToken";
const router = Router();
router.post("/booking",firebaseVerifyIdToken,createBooking);
router.get("/booking", listBooking);
router.get("/booking/:id", read);
router.patch("/booking/:id", updateStatus);
router.get("/booking-history/:id",userBookingList)
router.get("/booking-employee-list/:id",employeeBookingList)
router.get('/booking-gender-statistics/',bookingGenderStatistics)
export default router;
