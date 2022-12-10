import { Router } from "express";
import {
  bookingGenderStatistics,
  createBooking,
  employeeBookingList,
  listBooking,
  read,
  updateStatus,
  userBookingList,
  employeeBookingList2,
} from "../controllers/booking";
import { isEmployee } from "../middlewares/checkRole";
import { firebaseVerifyIdToken } from "../middlewares/firebaseVerifyIdToken";
import { jwtVerifyToken } from "../middlewares/jwtVerifyToken";
const router = Router();
router.post("/booking", firebaseVerifyIdToken, createBooking);
router.post("/bookingAddByEmployee", createBooking);
router.get("/booking", listBooking);
router.get("/booking/:id", read);
router.patch("/booking/:id", updateStatus);
router.get("/booking-history/:id", userBookingList);
router.get("/booking-employee-list/:id", employeeBookingList);
router.get("/booking-gender-statistics/", bookingGenderStatistics);
router.get(
  "/booking-employee",
  jwtVerifyToken,
  isEmployee,
  employeeBookingList2
);
export default router;
