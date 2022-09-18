import Booking from "../models/booking";
// export const createBooking = async (res, req) => {
//   try {
//     const book = await new Booking(req.body).save();
//     return res.json(book);
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };

export const createBooking = async (req, res) => {
  try {
    const booking = await new Booking(req.body).save();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const listBooking = async (req, res) => {
  try {
    const booking = await Booking.find({}).populate("timeBook.shift").exec();
    return res.json(booking);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
