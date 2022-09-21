import { Router } from "express";
import {list,create,update,read, addEmployeeShift} from "../controllers/employee";
const router = Router();
router.get("/employees",list)
router.post("/employees",create)
router.put("/employees/:id",update)
router.get("/employees/:id",read)
router.patch('/employees/new-employee-shift/:id',addEmployeeShift)
export default router;