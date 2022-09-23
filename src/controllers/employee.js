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


export const updateEmployeeShift = async (req, res) => {
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