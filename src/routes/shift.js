import { Router } from "express";
import { createShift, getListShift, deleteShift } from "../controllers/shift";
const router = Router();
router.post("/shift", createShift);
router.get("/shift", getListShift);
router.delete("/shift/:id", deleteShift);
export default router;
