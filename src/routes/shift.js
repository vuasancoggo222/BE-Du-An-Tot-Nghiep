import { Router } from "express";
import { createShift } from "../controllers/shift";
const router = Router();
router.post("/shift", createShift);
export default router;
