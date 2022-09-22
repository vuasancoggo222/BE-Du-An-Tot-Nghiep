import { Router } from "express";
import {list,create,update,read, addEmployeeShift, deleteEmployeeShift} from "../controllers/employee";
import employee from "../models/employee";
const router = Router();
router.get("/employees",list)
router.post("/employees",create)
router.put("/employees/:id",update)
router.get("/employees/:id",read)
router.patch('/employees/new-employee-shift/:id',addEmployeeShift)
router.patch('/employee/delete-employee-shift/:id',deleteEmployeeShift)
export default router;