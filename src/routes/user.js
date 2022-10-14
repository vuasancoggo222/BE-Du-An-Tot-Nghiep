import {Router} from 'express'
import { listUser } from '../controllers/user'

const router = new Router()

router.get('/users',listUser)

export default router