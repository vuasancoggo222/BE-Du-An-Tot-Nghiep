import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
name : {
    type : String,
    required : true,
    trim : true,
},
phoneNumber:{
    type : String,
    unique : true,
    validate : (value) =>{
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
    }
},
password: {
    type: String,
    required: true,
    minLength: 8,
    validate : (value) => {
        return validator.isAlphanumeric(value)
    }
},
role : {
    type : Number,
    default : 0,
},
status : {
    type : Number,
    default : 0    
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