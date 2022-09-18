import { Router } from "express";
import { createShift, getListShift } from "../controllers/shift";
const router = Router();
router.post("/shift", createShift);
router.get("/shift", getListShift);
export default router;
