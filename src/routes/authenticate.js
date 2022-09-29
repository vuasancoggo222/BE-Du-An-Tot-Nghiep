import { Router } from "express";
import { signin, signup} from "../controllers/authenticate";

const router = Router()

router.post('/signin',signin)
router.post('/signup',signup)
router.post('/verify-account')
export default router