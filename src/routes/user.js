import {Router} from 'express'
import { getOneUser, getUserProfile, listUser, updateProfile, updateUser, updateUserpassword, userAccountStatistics } from '../controllers/user'
import { isAdmin } from '../middlewares/checkRole'
import { jwtVerifyToken } from '../middlewares/jwtVerifyToken'

const router = new Router()

router.get('/users',listUser)
router.put('/user/my-profile/edit',jwtVerifyToken,updateProfile)
router.get('/user/my-profile',jwtVerifyToken,getUserProfile)
router.get('/user/:id',jwtVerifyToken,isAdmin,getOneUser)
router.put('/user/edit/:id',jwtVerifyToken,isAdmin,updateUser)
router.get('/users/acccount-status-statistics',userAccountStatistics)
router.put('/update-password',jwtVerifyToken,updateUserpassword)
export default router