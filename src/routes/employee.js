import { Router } from "express";
import {list,create,update,read, addEmployeeShift, deleteEmployeeShift, getEmployeeByDate} from "../controllers/employee";
const router = Router();
router.get("/employees",list)
router.post("/employees",create)
router.put("/employees/:id",update)
router.get("/employees/:id",read)
router.patch('/employees/new-employee-shift/:id',addEmployeeShift)
router.patch('/employees/delete-employee-shift/:id',deleteEmployeeShift)
router.get('/employee/get-employee-by-date',getEmployeeByDate)
export default router;