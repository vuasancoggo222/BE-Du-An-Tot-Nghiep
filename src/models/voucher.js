const { ObjectId } = mongoose.Types;
import mongoose, { Schema } from "mongoose";

const voucherSchema = new Schema(
  {
    name : {
        type :String,
        required:true
    },
    code:{
        type:String,
        required:true,
        minLength:4
    },
    discount:{
        type : Number,
        required:true
    },
    service:{
        type :ObjectId,
        ref: 'Service',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    expirationDate:{
        type : Date,
        required :true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Voucher", voucherSchema);
