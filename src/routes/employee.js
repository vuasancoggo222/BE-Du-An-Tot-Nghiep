import { Router } from "express";
import {list,create} from "../controllers/employee";

const router = Router();
router.post("/employees", create);
router.get("/employees",list)

export default router;