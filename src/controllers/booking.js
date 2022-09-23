import { mongoose } from "mongoose";
import Booking from "../models/booking";
import Employee from "../models/employee";
import moment from "moment/moment";
export const getEmployeeByDate = async (req, res) => {
  const timeStamp = Number(req.query.date);
  const employeeId = req.query.employee
  const currentTimeStamp = moment().startOf('day').unix()
  try {
   if(timeStamp && employeeId){
    const existEmployee = await Employee.aggregate([
      { $match : { _id : mongoose.Types.ObjectId(employeeId) }},
      {
        $project : {
          "timeWork" : {
            $filter : {
              input: "$timeWork",
              as: "data",
              cond: {
                  $eq: ["$$data.date", timeStamp],
              }
            }
          }
        }
      }
    ])
    return res.json(existEmployee)
   }
   else if(timeStamp && !employeeId){
    const existEmployee = await Employee.aggregate([
      {
        $project : {
          "timeWork" : {
            $filter : {
              input: "$timeWork",
              as: "data",
              cond: {
                  $eq: ["$$data.date", timeStamp],
              }
            }
          }
        }
      }
    ])
    return res.json(existEmployee)
   }
   else if(!timeStamp && employeeId){
    const existEmployee = await Employee.aggregate([
      { $match : { _id : mongoose.Types.ObjectId(employeeId) }},
      {
        $project : {
          "timeWork" : {
            $filter : {
              input: "$timeWork",
              as: "data",
              cond: {
                  $gte : ["$$data.date",currentTimeStamp]
              }
            }
          }
        }
      }
    ])
    return res.json(existEmployee)
   }
   else{
    return res.status(400).json({
      message : 'Vui lòng chọn thời gian hoặc nhân viên.'
    })
   }
  } catch (error) {
    return res.status(400).json({
      message : error.message
    })
  }
};
export const createBooking = async (req, res) => {
  try {
   
    const booking = await new Booking({
      name : req.body.name,
      phoneNumber : req.body.phoneNumber,
      description : req.body.description,
      serviceId : req.body.serviceId,
      employeeId : req.query.employeeId,
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
    const booking = await Booking.find({}).populate("timeBook.shiftId").exec();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
