import Booking from "../models/booking";
import Employee from "../models/employee";

export const getEmployeeByDate = async (req, res) => {
  const timeStamp = Number(req.query.date);
  try {
    const existEmployee = await Employee.find({
      timeWork: { $elemMatch: { date: timeStamp }},
    })
      .select("-idCard")
      .populate('timeWork.shiftId')
      .exec();

    res.json(existEmployee);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const createBooking = async (req, res) => {
  try {
    const booking = await new Booking(req.body).save();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const listBooking = async (req, res) => {
  try {
    const booking = await Booking.find({}).populate("timeBook.shift").exec();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
