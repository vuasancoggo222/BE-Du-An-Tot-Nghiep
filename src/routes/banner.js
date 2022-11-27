import { Router } from "express";
import { post, update, read, list, remove } from "../controllers/banner";
const router = Router();
router.post("/banners", post);
router.patch("/banners/:id", update);
router.get("/banners/:id", read);
router.get("/banners", list);
router.delete("/banners/:id", remove);

export default router;
