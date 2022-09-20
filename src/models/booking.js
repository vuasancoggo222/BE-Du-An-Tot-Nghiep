import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
      validate: (value) => {
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
      },
    },
    status: {
      type: Number,
      default: 0,
    },
    userId: {
      type: ObjectId,
      ref: "Users",
    },
    timeBook: {
      type : Array,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Booking", userSchema);
