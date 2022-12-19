import Notification from "../models/notification";

export const getListAdminNotification = async () => {
  try {
    const listNotification = await Notification.find({notificationType : 'admin'})
      .populate("bookingId")
      .sort({ createdAt: -1 })
      .exec();
    const unRead = await Notification.countDocuments({ readed: false, notificationType : 'admin' }).exec();
     return {
      notfication: listNotification,
      unRead,
    };
  } catch (error) {
    return error
  }
};

export const newNotification = async (data) => {
  try {
    const newNotification = await new Notification(data).save();
    return newNotification;
  } catch (error) {
    return error;
  }
};

export const getUserListNotification = async (userId) => {
  try {
    const userListNotification = await Notification.find({userId}).sort({ createdAt: -1 }).exec();
    const unRead = userListNotification.filter(item => item.userId == userId && item.readed == false)
    return {
      notification: userListNotification,
      unRead : unRead.length,
    }
  } catch (error) {
    return error
  }
};

export const getEmployeeListNotification = async (employeeId) => {
  try {
    const employeeList = await Notification.find({employeeId}).sort({ createdAt: -1 }).exec();
    const unRead = employeeList.filter(item => item.employeeId == employeeId && item.readed == false)
    return {
      notification: employeeList,
      unRead : unRead.length,
    }
  } catch (error) {
    return error
  }
};

export const readNotification = async (req, res) => {
  try {
    const readNotification = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      { readed: true },
      { new: true }
    ).exec();
    res.json(readNotification);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
