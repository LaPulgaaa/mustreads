import express from 'express';
import Admin from '../models/admin.js';

import Note from '../models/notes.js';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import dotenv from 'dotenv'
import authenticate from '../middleware/authenticate.js';
// const express=require("express");
// const Admin=require("../models/admin.js");
// const jwt=require("jsonwebtoken");
// const bycrypt=require("bcrypt")
// require("dotenv").config();
dotenv.config()

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

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;

    const user=await Admin.findOne({"username":username});
    if(user!=undefined)
    {
        const valid=await bycrypt.compare(password,user.password);

        if(valid)
        {
            const payload={
                username,
                password,
                id:user._id
            }
            const new_token=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
            res.status(200).json({msg:"logged in successfull",token:new_token});
        }
        else
        res.status(401).send("password wrong!")
    }
    else
    res.status(401).send("username not present");
})


//add notes
router.post("/createNotes",authenticate,async(req,res)=>{

    const {course,topic,content}=req.body;

    const admin=await Admin.findOne({"username":req.user.username,"password":req.user.password});
    const new_note=await Note.create({
        course:course,
        topic:topic,
        content:content,
        admin:admin._id
    });
    res.status(201).json({msg:"new notes added successfully",new_note});
    

})
export default router


