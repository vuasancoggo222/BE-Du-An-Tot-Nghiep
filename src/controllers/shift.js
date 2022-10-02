import Shift from "../models/shift";
export const createShift = async (req, res) => {
  try {
    const shift = await new Shift(req.body).save();
    return res.json({
      message : 'Success',
      shift
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getListShift = async (req, res) => {
  try {
    const shift = await Shift.find().sort({ _id : 1 }).exec();
    return res.json({
      message : 'Success',
      shift
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });


  }
};

export const read = async (req, res) => {
  try {
    const shift = await Shift.findOne({ _id: req.params.id }).exec();
    res.json(shift);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete({ _id: req.params.id }).exec();
    if(!shift){
      return res.status(400).json({
        message : 'Ca không tồn tại'
      })
    }
    return res.json({
      message : 'Success',
      shift
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
