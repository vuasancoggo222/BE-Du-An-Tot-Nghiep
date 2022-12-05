import { Router } from "express";
let router =  Router()
import {createVoucher} from '../controllers/voucher'


router.post('/voucher/add',createVoucher)

export default router