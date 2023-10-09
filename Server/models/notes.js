import { ObjectId } from "mongodb";
import mongoose, { Schema, SchemaTypes } from "mongoose";

const notes=mongoose.Schema({
    course:{type:String,required:true},
    topic:{type:String,required:true},
    content:{type:String},
    published:{type:Boolean,default:false},
    admin:{type:SchemaTypes.ObjectId,ref:"Admin"}
})

const Note=mongoose.model("Note",notes);
export default Note