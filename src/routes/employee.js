import { Router } from "express";
import {list,create,update,read,deleteEmployee, employeeOrderStatistics, statisticsForOneEmployee} from "../controllers/employee";
const router = Router();
router.get("/employees",list)
router.post("/employees",create)    
router.put("/employees/:id",update)
router.delete("/employees/:id",deleteEmployee)
router.get("/employees/:id",read)
router.get("/employee/order-statistics",employeeOrderStatistics)
router.get("/statistics-for-employee",statisticsForOneEmployee)
export default router;