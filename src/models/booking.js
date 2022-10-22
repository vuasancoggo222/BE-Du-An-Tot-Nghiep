import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new Schema(
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
    bookingPrice : {
      type : Number
    }
  },
  { timestamps: true }
);
export default mongoose.model("Booking", userSchema);
