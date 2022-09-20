import { Router } from "express";
import {list} from "../controllers/employee";
const router = Router();
router.get("/employees",list)

export default router;