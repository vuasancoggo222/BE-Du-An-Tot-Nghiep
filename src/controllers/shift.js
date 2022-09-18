import Shift from "../models/shift";
export const createShift = async (req, res) => {
  try {
    const shift = await new Shift(req.body).save();
    return res.json(shift);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getListShift = async (req, res) => {
  try {
    const shift = await Shift.find().sort({ timeStart: 1 }).exec();
    return res.json(shift);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete({ _id: req.params.id }).exec();
    return res.json(shift);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
