import Notification from "../models/notification";

export const getListAdminNotification = async (req,res) =>{
    try {
        const listNotification = await Notification.find({}).populate('bookingId').exec()
        return listNotification
    } catch (error) {
        console.log(error);
    }
}

export const newNotification = async (data) => {
    try {
        const newNotification = await new Notification(data).save()
    } catch (error) {
        console.log(error);
    }
}