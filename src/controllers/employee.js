import Employee from "../models/employee";
import Shift from '../models/shift'
import moment from "moment/moment";
import { mongoose } from "mongoose";
export const list = async (req, res) => {
  try {
    const employees = await Employee.find({}).exec();
    res.json(employees);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const employees = await new Employee(req.body).save();
    res.json(employees);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { id_: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(employee);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const read = async (req, res) => {
  try {
    const employee = await Employee.findOne({ id_: req.params.id }).exec();
    res.json(employee);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const addEmployeeShift = async (req, res) => {
  const employeeId = req.params.id;
  const newShift = req.body;
  const date = Number(newShift.date);
  const shiftId = req.body.shiftId;
  try {
    const existShift = await Employee.find({
      _id: employeeId,
       "timeWork" :{ $elemMatch: {date,shiftId} }
    }).exec();
    if (existShift.length) {
      return res.status(400).json({
        message: "Ca làm đã tồn tại",
      });
    } else {
      const employee = await Employee.findOneAndUpdate(
        { _id: employeeId },
        { $push: { timeWork: newShift } },
        { new: true }
      ).exec();
      return res.json({
        success: "Success",
        employee,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteEmployeeShift = async (req,res) => {
  const employeeId = req.params.id;
  const date = Number(req.query.date);
  const shiftId = req.query.shift;
  try {
    const existShift = await Employee.find({
      _id: employeeId,
       "timeWork" :{ $elemMatch: {date,shiftId} }
    }).exec();
    if (existShift.length) {
      const employee = await Employee.findOneAndUpdate(
        { _id: employeeId },
        { $pull: { "timeWork": {shiftId,date} } },
        { new: true,safe: true }
      ).exec();
      return res.json({
        success: "Success",
        employee,
      });
    }
    else {
      return res.status(400).json({
        message: "Ca làm không tồn tại",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}
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
    await Shift.populate(existEmployee,{path : "timeWork.shiftId"})
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