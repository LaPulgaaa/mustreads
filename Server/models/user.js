import mongoose, { SchemaTypes } from "mongoose";

const user=mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    branch:{type:String},
    batch:{type:Number},
    favs:[{type:SchemaTypes.ObjectId,ref:"Note"}]
})

const User=mongoose.model("User",user);
export default User