import Users from "../models/user";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const existUser = await Users.findOne({ phoneNumber }).exec();
    if (existUser) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại",
      });
    }
    const user = await new Users(req.body).save();
    return res.json({
      user: {
        _id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
