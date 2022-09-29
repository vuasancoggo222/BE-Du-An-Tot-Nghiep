import { Router } from "express";
import {list,create,update,read, addEmployeeShift, deleteEmployeeShift, getEmployeeByDate, deleteEmployee, updateStatusTimeWork} from "../controllers/employee";
const router = Router();
router.get("/employees",list)
router.post("/employees",create)    
router.put("/employees/:id",update)
router.patch("/employees/update-employee-shift/:id",updateStatusTimeWork)
router.delete("/employees/:id",deleteEmployee)
router.get("/employees/:id",read)
router.patch('/employees/new-employee-shift/:id',addEmployeeShift)
router.patch('/employees/delete-employee-shift/:id',deleteEmployeeShift)
router.get('/employee/get-employee-by-date',getEmployeeByDate)
export default router;