import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    cart:[String]
})

const UserModel = mongoose.model("User",UserSchema)

export default UserModel