import { Router } from "express";
import {list,create} from "../controllers/employee";

const router = Router();

router.get("/employees", list);
router.post("/employees", create);

export default router;