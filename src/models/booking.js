import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type: String,
      required : true
    },
    note: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    time : {
      type : String,
    },
    userId: {
      type: ObjectId,
      ref: "Users",
    },
    employeeId: {
      type: ObjectId,
      ref: "Employee",
    },
    serviceId: [
      {
        type : ObjectId,
        ref : "Service"
      }
    ],
    gender:{
      type : String,
    },
    bookingPrice : {
      type : Number
    },
  },
  { timestamps: true }
);
bookingSchema.index({employeeId : -1})
export default mongoose.model("Booking", bookingSchema);
