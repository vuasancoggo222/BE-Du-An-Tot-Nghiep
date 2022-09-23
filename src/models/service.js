import mongoose from "mongoose";
import { Schema } from "mongoose";

const serviceSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim : true
    },
    description: {  
        type: String,
        required : true
    },
    price: {
        type: Number,
        required : true
    },
    status: {
        type: Number,
        default:1
    }
}, { timestamps: true })
export default mongoose.model('Service', serviceSchema);