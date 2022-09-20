import { Router } from "express";
import { create, list} from "../controllers/employee";
const router = Router();
router.get("/employees",list)

export default router;