import mongoose from "mongoose";
import { Schema } from "mongoose";
const shiftSchema = new Schema(
  {
    shiftName: {
      type: String,
      required: true,
    },
    timeStart: {
      type: String,
      required: true
    },
    timeEnd: {
       type: String,
       required: true
       },
  },
  { timestamps: true }
);
export default mongoose.model("Shift", shiftSchema);
