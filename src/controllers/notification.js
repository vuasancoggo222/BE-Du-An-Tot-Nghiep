import Notification from "../models/notification";

export const getListAdminNotification = async (req,res) =>{
    try {
        const listNotification = await Notification.find({}).populate('bookingId').sort({createdAt : -1}).exec()
        return listNotification
    } catch (error) {
        console.log(error);
    }
}

export const newNotification = async (data) => {
    try {
        const newNotification = await new Notification(data).save()
    } catch (error) {
       return error
    }
}

export const getUserListNotification = async (userId) => {
    try {
        const userListNotification = await Notification.find({userId}).sort({createdAt: -1}).exec()
        return userListNotification
    } catch (error) {
        return error
    }
}