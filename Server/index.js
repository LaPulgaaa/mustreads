import express from 'express'
import cors from 'cors'
import adminRoute from './router/admin.js'
import connectDb from './db/dbConnect.js';
import dotenv from 'dotenv'
import _ from './env.js'
// const express=require("express");
// const cors=require("cors");
// const adminRoute=require("./router/admin.js");
// const connectDb=require("./db/dbConnect.js");
dotenv.config()
connectDb();


const corsOptions={
    origin:"http://localhost:5173",
    methods:'GET,PUT,POST,DELETE,PATCH',
    credentials:true,

}
const app=express();
app.use(cors(corsOptions));

app.use(express.json());


app.use("/admin",adminRoute);
app.get("/",(req,res)=>{
    res.status(200).send("welcome to the website")
})

app.listen(3000,()=>{
    console.log("listening to port 3000")
})





