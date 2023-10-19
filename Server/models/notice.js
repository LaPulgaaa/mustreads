import mongoose from "mongoose";
import { SchemaTypes } from "mongoose";
const notice_schema =mongoose.Schema({
    by:{type:SchemaTypes.ObjectId,ref:"admin",required:true},
    announcement:{type:String},
    time:{type:Date,default:()=>Date.now()},
    name:{type:String}
})

const Notice=mongoose.model("Notice",notice_schema);
export default Notice;