import { Router } from "express";
import { createShift, getListShift, deleteShift, read } from "../controllers/shift";
const router = Router();
router.post("/shift", createShift);
router.get("/shift", getListShift);
router.get("/shift/:id", read);
router.delete("/shift/:id", deleteShift);
export default router;
