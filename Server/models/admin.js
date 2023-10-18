import mongoose from "mongoose";
import { SchemaTypes } from "mongoose";
const admin=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true,minLength:6},
    branch:{type:String,required:true},
    batch:{type:Number,required:true},
    about:{type:String,default:""},
    email:{type:String,default:"admin123@gmail.com"},
    follower:{type:SchemaTypes.ObjectId,ref:"User"}
})

const Admin=mongoose.model("admin",admin);
export default Admin;
