import { mongoose } from "mongoose";
import Booking from "../models/booking";
import User from "../models/user";
import moment from "moment";

export const createBooking = async (req, res) => {
  try {
    const booking = await new Booking({
      name: req.body.name,
      userId: req.query.user,
      phoneNumber: req.body.phoneNumber,
      note: req.body.note,
      services: req.body.services,
      employeeId: req.body.employeeId,
      date: req.body.date,
      time: req.body.time,
      age: req.body.age,
      gender: req.body.gender,
      bookingPrice: req.body.bookingPrice,
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
      .sort({ createdAt: -1 })
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
    if (req.body.status == 4) {
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      ).exec();
      await User.findOneAndUpdate(
        { _id: booking.userId },
        { $push: { serviceUsed: booking.serviceId } }
      );
      return res.json(booking);
    } else {
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      ).exec();
      return res.json(booking);
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const userBookingList = async (req, res) => {
  try {
    const listBooking = await Booking.find({ userId: req.params.id })
      .populate("serviceId")
      .exec();
    return res.json(listBooking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const employeeBookingList = async (req, res) => {
  try {
    const listBooking = await Booking.find({
      employeeId: req.params.id,
    }).exec();
    return res.json(listBooking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const bookingGenderStatistics = async (req, res) => {
  const { svid, timeStart, timeEnd } = req.query;
  try {
    if ((svid && !timeStart) || !timeEnd) {
      const male = await Booking.countDocuments({
        gender: "male",
        status: 4,
        serviceId: { $in: [svid] },
      }).exec();
      const female = await Booking.countDocuments({
        gender: "female",
        status: 4,
        serviceId: { $in: [svid] },
      }).exec();
      return res.json({ male, female });
    } else if (timeStart && timeEnd && !svid) {
      const male = await Booking.countDocuments({
        gender: "male",
        status: 4,
        date: {
          $gte: new Date(Number(timeStart) * 1000).toISOString(),
          $lte: new Date(Number(timeEnd) * 1000).toISOString(),
        },
      }).exec();
      const female = await Booking.countDocuments({
        gender: "female",
        status: 4,
        date: {
          $gte: new Date(Number(timeStart) * 1000).toISOString(),
          $lte: new Date(Number(timeEnd) * 1000).toISOString(),
        },
      }).exec();
      return res.json({ male, female });
    } else if (timeStart && timeEnd && svid) {
      const male = await Booking.countDocuments({
        gender: "male",
        status: 4,
        serviceId: { $in: [svid] },
        date: {
          $gte: new Date(Number(timeStart) * 1000).toISOString(),
          $lte: new Date(Number(timeEnd) * 1000).toISOString(),
        },
      }).exec();
      const female = await Booking.countDocuments({
        gender: "female",
        status: 4,
        serviceId: { $in: [svid] },
        date: {
          $gte: new Date(Number(timeStart) * 1000).toISOString(),
          $lte: new Date(Number(timeEnd) * 1000).toISOString(),
        },
      }).exec();
      return res.json({ male, female });
    } else {
      const male = await Booking.countDocuments({
        gender: "male",
        status: 4,
      }).exec();
      const female = await Booking.countDocuments({
        gender: "female",
        status: 4,
      }).exec();
      return res.json({ male, female });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const employeeBookingList2 = async (req, res) => {
  console.log(req.user);
  try {
    const listBooking = await Booking.find({
      employeeId: req.user.employeeId,
    }).exec();
    return res.json(listBooking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
