import { Router } from "express";
import { create} from "../controllers/employee";

const router = Router();

router.get("/employees", list);
router.post("/employees", create);
router.get("/employees", read);
router.delete("/employees", remove);
router.put("/employees", update);
export default router;