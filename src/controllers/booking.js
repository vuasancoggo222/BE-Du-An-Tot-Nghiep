import { Mongoose } from "mongoose";
import Booking from "../models/booking";

export const createBooking = async (req, res) => {
  try {
   
    const booking = await new Booking({
      name : req.body.name,
      userId : req.query.user,
      phoneNumber : req.body.phoneNumber,
      description : req.body.description,
      serviceId : req.body.serviceId,
      employeeId : req.body.employeeId,
      date : Number(req.body.date),
      shiftId: req.body.shiftId
    }).save();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const listBooking = async (req, res) => {
  try {
    const booking = await Booking.find({})
    .populate({path: 'userId',select : '-password'})
    .populate("serviceId")
    .populate({path : 'employeeId',select : '-idCard'})
    .exec();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
