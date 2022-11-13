import { redis } from "googleapis/build/src/apis/redis";
import Booking from "../models/booking";
import Employee from "../models/employee";
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
      { _id: req.params.id },
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
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    res.json(employee);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete(
      { _id: req.params.id },
      { new: true }
    ).exec();
    res.json({
      message: "Success",
      employee,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const employeeOrderStatistics = async (req, res) => {
  let statistics = [];
  try {
    const employee = await Employee.find({}).select("-idCard").exec();
    const getTotal = await Booking.aggregate([
      { $match: { status: 4 } },
      { $group: { _id: null, sum: { $sum: "$bookingPrice" } } },
    ]);
    const totalTurnOver = getTotal[0].sum;
    for (let i = 0; i < employee.length; i++) {
      const finishedBooking = await Booking.find({
        employeeId: employee[i]._id,
        status: 4,
      }).exec();
      const turnover = finishedBooking.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.bookingPrice,
        0
      );

      const percentage = Number(turnover / totalTurnOver) * 100;
      console.log(percentage);
      const totalBooking = await Booking.countDocuments({
        employeeId: employee[i]._id,
      }).exec();
      const unConfimred = await Booking.countDocuments({
        employeeId: employee[i]._id,
        status: 0,
      }).exec();
      const confirmed = await Booking.countDocuments({
        employeeId: employee[i]._id,
        status: 1,
      }).exec();
      const canceled = await Booking.countDocuments({
        employeeId: employee[i]._id,
        status: 2,
      }).exec();
      const waitToPay = await Booking.countDocuments({
        employeeId: employee[i]._id,
        status: 3,
      }).exec();
      const finished = await Booking.countDocuments({
        employeeId: employee[i]._id,
        status: 4,
      }).exec();
      const status = {
        employee: employee[i],
        totalBooking,
        unConfimred,
        confirmed,
        finished,
        waitToPay,
        canceled,
        turnover,
        percentage,
      };
      statistics.push(status);
    }
    res.json({
      statistics,
      totalEmployee: employee.length,
      totalTurnOver,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const statisticsForOneEmployee = async(req,res) =>{
  const id =  req.query.id 
  const getTotal = await Booking.aggregate([
    { $match: { status: 4 } },
    { $group: { _id: null, sum: { $sum: "$bookingPrice" } } },
  ]);
  const totalTurnOver = getTotal[0].sum;
  try {
    const information = await Employee.findOne({_id : id}).exec()
    const totalBooking = await Booking.countDocuments({employeeId : id}).exec()
    const unConfimred = await Booking.countDocuments({employeeId : id,status:0}).exec()
    const confirmed = await Booking.countDocuments({employeeId : id,status:1}).exec()
    const canceled = await Booking.countDocuments({employeeId : id,status:2}).exec()
    const waitToPay = await Booking.countDocuments({employeeId : id,status:3}).exec()
    const finished = await Booking.countDocuments({employeeId : id,status:4}).exec()
    const finishedBooking = await Booking.find({
      employeeId: id,
      status: 4,
    }).exec();
    const turnover = finishedBooking.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.bookingPrice,
      0
    );
    const percentage = Number(turnover / totalTurnOver) * 100;
    res.json({
      information,
      totalBooking,
      unConfimred,
      confirmed,
      canceled,
      waitToPay,
      finished,
      turnover,
      percentage
    })
  } catch (error) {
    return res.json(error.message)
  }
}