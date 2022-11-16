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
userId : {
    type : ObjectId,
    ref : 'Users'
}
},{timestamps: true})

export default mongoose.model('Notification',notificationSchema)