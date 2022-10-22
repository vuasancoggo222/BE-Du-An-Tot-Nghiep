import {Router} from 'express'
import { getUserProfile, listUser, updateProfile, updateUser } from '../controllers/user'
import { isAdmin } from '../middlewares/checkRole'
import { jwtVerifyToken } from '../middlewares/jwtVerifyToken'

const router = new Router()

router.get('/users',listUser)
router.put('/user/my-profile/edit',jwtVerifyToken,updateProfile)
router.get('/user/my-profile',jwtVerifyToken,getUserProfile)
router.put('/user/edit/:id',jwtVerifyToken,isAdmin,updateUser)
export default router