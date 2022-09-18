import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";
const shiftSchema = new Schema(
  {
    shiftName: {
      type: String,
      required: true,
    },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Shift", shiftSchema);
