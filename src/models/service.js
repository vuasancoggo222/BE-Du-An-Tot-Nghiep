import mongoose from "mongoose";
import { Schema } from "mongoose";

const serviceSchema = new Schema({
    name: {
        type: String,
        unique: true,
   
    },
    time: {
        type:Date,
    },
    description: {
        type: String,

    },
    price: {
        type: Number,

    },
    status: {
        type: Number,
        default:1

    }
}, { timestamps: true })
export default mongoose.model('Service', serviceSchema);