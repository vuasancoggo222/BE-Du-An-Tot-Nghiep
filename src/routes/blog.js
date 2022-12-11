import {Router} from "express"
import { createBlog, deleteBlog, editBlog, getDetailBlog, listBlog, listBlogLatest } from '../controllers/blog'
const router = Router()

router.get("/blogs",listBlog)
router.get('/blogs-latest',listBlogLatest)
router.get("/blogs/:slug",getDetailBlog)
router.post("/blog/add",createBlog)
router.put("/blog/:id",editBlog)
router.delete("/blog/:id",deleteBlog)

export default router