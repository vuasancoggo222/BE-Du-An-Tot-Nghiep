import { Router } from "express";
import { create} from "../controllers/employee";

const router = Router();
router.post("/employees", create);

export default router;