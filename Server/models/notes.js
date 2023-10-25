import { ObjectId } from "mongodb";
import mongoose, { Schema, SchemaTypes } from "mongoose";

const notes=mongoose.Schema({
    course:{type:String,required:true},
    topic:{type:String,required:true},
    content:{type:String},
    published:{type:Boolean,default:false},
    category:{type:String,default:"Notes"},
    admin:{type:SchemaTypes.ObjectId,ref:"Admin"},
    publicId:{type:String,default:""}
})

const Note=mongoose.model("Note",notes);
export default Note