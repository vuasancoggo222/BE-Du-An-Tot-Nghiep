import { mongoose } from "mongoose";
import Booking from "../models/booking";
export const createBooking = async (req, res) => {
  try {
    const booking = await new Booking({
      name: req.body.name,
      userId: req.query.user,
      phoneNumber: req.body.phoneNumber,
      note: req.body.note,
      serviceId: req.body.serviceId,
      employeeId: req.body.employeeId,
      date: req.body.date,
      time: req.body.time
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
      .populate({ path: "userId", select: "-password" })
      .populate("serviceId")
      .populate({ path: "employeeId", select: "-idCard" })
      .exec();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const read = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id }).exec();
    res.json(booking);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    ).exec();
    res.json(booking);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const userBookingList = async (req,res) =>{
  try {
    const listBooking = await Booking.find({userId : req.params.id}).populate('serviceId').exec()
    return res.json(listBooking)
  } catch (error) {
    return res.status(400).json({
      message : error.message
    })
  }
}

export const employeeBookingList = async (req,res) =>{
  try {
    const listBooking = await Booking.find({employeeId : req.params.id}).exec()
    return res.json(listBooking)
  } catch (error) {
    return res.status(400).json({
      message : error.message
    })
  }
}