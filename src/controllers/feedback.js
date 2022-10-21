import Feedback from "../models/feedback";

export const serviceFeedback = async(req,res) => {
    req.body.feedbackType = 'service'
    try {
     const feedback = await new Feedback(req.body).save();
     res.json(feedback)
    
   } catch (error) {
     return res.status(400).json({
       message: error.message,
     });
   }
}

export const listFeedBackByService = async (req,res) => {
    try {
        const listFeedback = await Feedback.find({service : req.params.svid}).populate({ path: 'user', select: ['name','_id','avatar'] }).exec()
        res.json(listFeedback)
    } catch (error) {
        res.json(error.message)
    }
}