import mongoose from "mongoose";

const admin=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    branch:{type:String,required:true},
    batch:{type:Number,required:true}
})

const Admin=mongoose.model("admin",admin);
export default Admin;