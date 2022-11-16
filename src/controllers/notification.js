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

export const getUserListNotification = async (id) => {
    try {
        const listNotification = await Notification.find({userId : id}).sort({createdAt: -1}).exec()
        return listNotification
    } catch (error) {
        return error
    }
}