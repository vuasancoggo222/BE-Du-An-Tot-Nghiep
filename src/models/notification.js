import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const notificationSchema = new Schema({
bookingId : {
    type : ObjectId,
    ref : 'Booking'
},
notificationType : {
    type : String
},
text : {
    type : String
},
readed : {
    type : Boolean,
    default : false
}
},{timestamps: true})

export default mongoose.model('Notification',notificationSchema)