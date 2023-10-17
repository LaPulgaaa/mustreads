import mongoose from "mongoose";

const user=mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    branch:{type:String},
    batch:{type:Number,default:"hello everyone .I like to study and get good marks "}
})

const User=mongoose.model("User",user);
export default User