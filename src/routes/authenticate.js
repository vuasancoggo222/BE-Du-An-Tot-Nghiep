import { Router } from "express";
import { signup} from "../controllers/authenticate";

const router = Router()

router.post('/signin',)
router.post('/signup',signup)
router.post('/verify-account')
export default router