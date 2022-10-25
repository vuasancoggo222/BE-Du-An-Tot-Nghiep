import {
    Router
} from "express";
import {
    post,
    update

} from "../controllers/banner";
const router = Router()
router.post('/banners', post)
router.patch('/banners/:id', update)

export default router;