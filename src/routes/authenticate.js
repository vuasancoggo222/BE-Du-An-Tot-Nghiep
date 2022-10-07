import { Router } from "express";
import { changeStatusAccount, signin, signup} from "../controllers/authenticate";

const router = Router()

router.post('/signin',signin)
router.post('/signup',signup)
router.put('/change-account-status',changeStatusAccount)
export default router