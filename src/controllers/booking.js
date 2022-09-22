import { Mongoose } from "mongoose";
import Booking from "../models/booking";
import Employee from "../models/employee";

export const getEmployeeByDate = async (req, res) => {
  const timeStamp = Number(req.query.date);
  const {employee} = req.query
  try {
    const existEmployee = await Employee.find({
        "_id" :  employee ,
      "timeWork": { $elemMatch: { date: timeStamp }},
    })
      .select("-idCard")
      .populate('timeWork.shiftId')
      .exec();

    return res.json(existEmployee);
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
