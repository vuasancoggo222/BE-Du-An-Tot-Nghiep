import mongoose, {Schema} from "mongoose";

const {ObjectId} = mongoose.Types;
const employeeSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    idCard:{
        type:String
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:String,
        validate: (value) => {
            return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
        },
    },
    timeWork:{
        date:{
            type:String
        },
        shift:{
            type : ObjectId,
            ref:"Shift",
            required:true
        },
        status:{
            default:0
        }
    },
    status:{
        type:Number,
        default:1
    },
    avatar:{
        type:String,
    },
    gender:{
        type:Number,
    }

} ,{timestamps: true})

export default mongoose.model("Employee", employeeSchema)