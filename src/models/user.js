import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
const userSchema = new Schema({

password: {
    type: String,
    required: true,
    minLength: 8,
    validate : (value) => {
        return validator.isAlphanumeric(value)
    }
},
name : {
    type : String,
    required : true,
    trim : true,
},
age : {
    type : Number,
    required : true,
    validate(value){
        if(value < 1){
            throw new Error('Tuổi phải lớn hơn 0')
        }
    }
},
phoneNumber:{
    type : String,
    unique : true,
    validate : (value) =>{
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
    }
},
role : {
    type : Number,
    default : 2,
},
status : {
    type : Number,
    default : 0    
},
active : {
    type : Boolean ,
    default : false,
},
},{timestamps:true})

userSchema.pre('save',async function(next){
    const user = this
    const saltRounds = 10;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,saltRounds);
    }
    next()
})
export default mongoose.model('Users',userSchema)