import Notification from "../models/notification";

export const getListAdminNotification = async (req,res) =>{
    try {
        const listNotification = await Notification.find({}).populate('bookingId').sort({createdAt : -1}).exec()
        const unRead = await Notification.countDocuments({readed : false}).exec()
        res.json({
            notfication : listNotification,
            unRead
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const newNotification = async (data) => {
    try {
        const newNotification = await new Notification(data).save()
        return newNotification
    } catch (error) {
       return error
    }
}

export const getUserListNotification = async (req,res) => {
    try {
        const userListNotification = await Notification.find({userId : req.user._id}).sort({createdAt: -1}).exec()
        const unRead = await Notification.countDocuments({readed : false,userId : req.user._id}).exec()
        res.json({
            notification : userListNotification,
            unRead 
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}