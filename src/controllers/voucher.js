import Voucher from "../models/voucher";


let createVoucher = async(req,res) =>{
    try {
        const existVoucher = await Voucher.findOne({code : req.body.code}).exec()
        if(req.body.quantity < 1){
            return res.status(400).json({
                message : 'Số lượng Voucher phải lớn hơn 1.'
            })
        }
        if(existVoucher){
            return res.status(400).json({
                message : 'Mã Voucher này đã tồn tại.'
            })
        }
        const newVoucher = await new Voucher(req.body).save()
        return res.json(newVoucher)
    } catch (error) {
        return res.json(error.message)
    }
}

export  {
    createVoucher
}