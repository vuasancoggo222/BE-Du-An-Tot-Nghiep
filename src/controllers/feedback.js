import Feedback from "../models/feedback";

export const serviceFeedback = async (req, res) => {
  req.body.feedbackType = "service";
  try {
    const feedback = await new Feedback(req.body).save();
    res.json(feedback);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const listFeedBackByService = async (req, res) => {
  try {
    const calculateRating = await Feedback.aggregate([
      {"$unwind":"$service"},
      {
        "$group":{
          "_id" : "$service",
          "ratingAvg" : {"$avg":"$stars"}
        }
      }
    ])
    console.log(calculateRating[0]);
    const listFeedback = await Feedback.find({ service: req.params.svid }).sort({stars : "desc"})
      .populate({ path: "user", select: ["name", "_id", "avatar"] })
      .populate({ path: "userReply", select: ["name", "_id", "avatar"] })
      .exec();
  
    res.json({
      listFeedback,
      ratingAvg : calculateRating[0].ratingAvg
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const adminReplyFeedback = async (req, res) => {
  const update = {
    reply: req.body.reply,
    userReply: req.user._id,
  };
  try {
    const replyFeedback = await Feedback.findOneAndUpdate(
      { _id: req.params.id },
      update,
      { new: true }
    );
    const message = "Trả lời thành công";
    res.json({ message, replyFeedback });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
