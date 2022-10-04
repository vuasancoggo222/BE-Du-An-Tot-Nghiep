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

export const deleteEmployee = async (req,res) =>{
  try {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id },{new: true}).exec()
    res.json({
      message : 'Success',
      employee
    })
  } catch (error) {
    res.status(400).json({
      message : error.message
    })
  }
}