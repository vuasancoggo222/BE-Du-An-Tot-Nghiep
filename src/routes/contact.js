
import { Router } from "express";
import { createContact, deleteContact, getListContact } from "../controllers/contact";
const router = Router();
router.post("/contact", createContact);
router.get("/contact",getListContact)
router.delete("/contact/:id",deleteContact)
export default router;