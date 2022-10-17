import {Router} from 'express'
import { listUser, updateProfile } from '../controllers/user'
import { jwtVerifyToken } from '../middlewares/jwtVerifyToken'

const router = new Router()

router.get('/users',listUser)
router.put('/user/my-profile/edit',jwtVerifyToken,updateProfile)
export default router