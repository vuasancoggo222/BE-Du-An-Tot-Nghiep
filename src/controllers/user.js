import User from "../models/user"
import bcrypt from 'bcrypt'
export const listUser = async(req,res) => {
    try {
        const listUser = await User.find({}).sort({createdAt : -1}).exec()
        res.json(listUser)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

export const updateProfile = async (req,res) => {
    const updateData = {
        name : req.body.name,
        avatar : req.body.avatar,
        address : req.body.address,
        age : req.body.age,
        gender : req.body.gender,
    }
try {
    const updateProfile = await User.findByIdAndUpdate({_id : req.user._id},updateData,{new:true}).select('-password').exec()
    return res.json(updateProfile)
} catch (error) {
    return res.status(400).json(error.message)
}
}

export const getUserProfile = async (req,res) => {
 
try {
    const userProfile = await User.findByIdAndUpdate({_id : req.user._id}).select('-password').exec()
    return res.json(userProfile)
} catch (error) {
    return res.status(400).json(error.message)
}
}

export const updateUser = async (req,res) =>{
    const updateData = {
        name : req.body.name,
        avatar : req.body.avatar,
        address : req.body.address,
        age : req.body.age,
        gender : req.body.gender,
        status : req.body.status,
    }
try {
    const user = await User.findOneAndUpdate({_id : req.params.id},updateData,{new:true}).select('-password').exec()
    return res.json(user)
} catch (error) {
    return res.status(400).json()
}
}
export const getOneUser = async (req,res) => {
 
    try {
        const userProfile = await User.findByIdAndUpdate({_id : req.params.id}).select('-password').exec()
        return res.json(userProfile)
    } catch (error) {
        return res.status(400).json(error.message)
    }
    }

export const userAccountStatistics = async (req,res) =>{
    try {
        const totalUser = await User.countDocuments({}).exec()
        const unActiveUser = await User.countDocuments({status : 0}).exec()
        const availableUser = await User.countDocuments({status : 1}).exec()
        const lockUser = await User.countDocuments({status : 2}).exec()
        return res.json({
            totalUser,
            unActiveUser,
            availableUser,
            lockUser
        })
    } catch (error) {
        return res.json(error.message)
    }
}
export const updateUserpassword = async (req,res) => {
    let {currentPassword,newPassword,confirmPassword} = req.body
    const {_id} = req.user
    try {
    const user = await User.findOne({_id}).exec()
    const matchCurrentPassword = await bcrypt.compare(currentPassword,user.password)
    if(matchCurrentPassword){
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : "Mật khẩu xác nhận không khớp."
            })
        }
        else{
            const saltRounds = 10;
            newPassword = await bcrypt.hash(newPassword,saltRounds);
            console.log(newPassword);
            const update =  {
                password : newPassword
            }
           await User.findOneAndUpdate({_id},update).exec()
            return res.json({
                message : "Cập nhật mật khẩu thành công."
            })
            }
        }
        else{
            return res.status(400).json({
                message : "Mật khẩu hiện tại không đúng."
            })
        }
    }
    catch (error) {
        
    }
    } 
