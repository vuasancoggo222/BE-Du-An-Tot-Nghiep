import {Router} from 'express'
import { getUserProfile, listUser, updateProfile } from '../controllers/user'
import { jwtVerifyToken } from '../middlewares/jwtVerifyToken'

const router = new Router()

router.get('/users',listUser)
router.put('/user/my-profile/edit',jwtVerifyToken,updateProfile)
router.get('/user/my-profile',jwtVerifyToken,getUserProfile)
export default router