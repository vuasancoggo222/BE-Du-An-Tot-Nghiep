import { Router } from "express";
import { createContact, getListContact } from "../controllers/contact";
const router = Router();
router.post("/contact", createContact);
router.get("/contact", getListContact);
export default router;
