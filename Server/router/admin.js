// import express from 'express';
// import Admin from '../models/admin';

const express=require("express");
const Admin=require("../models/admin.js");
const jwt=require("jsonwebtoken");
const bycrypt=require("bcrypt")
require("dotenv").config();

const router=express.Router();

router.get("/intro",(req,res)=>{
    res.send("welcome admin!please help your friends pass the exams by uploading important notes and test papers")
})

//creating a admin ie.sign up

router.post("/signup",async(req,res)=>{
    const {username,password}=req.body;

    const hashedPassword=await bycrypt.hash(password,10);
    const admin=await Admin.create({
        username:username,
        password:hashedPassword
    })
    const payload={
        username,
        password,
        id:admin
    }
    const accessToken=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"})

    res.status(201).json({msg:"new admin registered",token:accessToken});
})

//logging in the user

router.post("/login",(req,res)=>{

})


