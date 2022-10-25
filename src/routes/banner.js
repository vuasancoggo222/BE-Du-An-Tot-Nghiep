import {
    Router
} from "express";
import {
    post,
    update,
    read

} from "../controllers/banner";
const router = Router()
router.post('/banners', post)
router.patch('/banners/:id', update)
router.get('/banners/:id', read)

export default router;