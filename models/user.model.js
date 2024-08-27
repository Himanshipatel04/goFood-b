import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default:Date.now
    }
})

userSchema.methods.isPasswordCorrect = function(password){
    return bcrypt.compare(password,this.password)
}

const User = mongoose.model("User",userSchema)

export {User}