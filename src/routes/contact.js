
import { Router } from "express";
import { createContact } from "../controllers/contact";
const router = Router();
router.post("/contact", createContact);
export default router;