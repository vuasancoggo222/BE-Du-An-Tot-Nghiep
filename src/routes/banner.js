import {
    Router
} from "express";
import {
    post,
    update,
    read,
    list

} from "../controllers/banner";
const router = Router()
router.post('/banners', post)
router.patch('/banners/:id', update)
router.get('/banners/:id', read)
router.get('/banners', list)

export default router;