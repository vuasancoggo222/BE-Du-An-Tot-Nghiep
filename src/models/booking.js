import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      validate: (value) => {
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
      },
    },
    note: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    date : {
      type : Number,
      required : true,
    },
    shiftId :{
      type : ObjectId,
      required : true,
      ref : "Shift"
    },
    userId : {
      type : ObjectId,
      ref : "Users"
    },
    employeeId : {
      type : ObjectId,
      ref : "Employee"
    },
    serviceId : {
      type : ObjectId,
      ref : "Service"
    },   
  },
  { timestamps: true }
);
export default mongoose.model("Booking", userSchema);
