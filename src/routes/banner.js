import {
    Router
} from "express";
import {
    post,

} from "../controllers/banner";
const router = Router()
router.post('/banners', post)

export default router;