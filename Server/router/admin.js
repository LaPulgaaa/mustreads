import express from 'express';
import Admin from '../models/admin.js';

import Note from '../models/notes.js';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import dotenv from 'dotenv'
import authenticate from '../middleware/authenticate.js';
import Notice from '../models/notice.js';

dotenv.config()

const router=express.Router();

router.get("/intro",(req,res)=>{
    res.send("welcome admin!please help your friends pass the exams by uploading important notes and test papers")
})

//creating a admin ie.sign up

router.post("/signup",async(req,res)=>{
    console.log(req.body)
    const {username,password,batch,branch,about,email}=req.body;

    const hashedPassword=await bycrypt.hash(password,10);
    const admin=await Admin.create({
        username:username,
        password:hashedPassword,
        batch:batch,
        branch:branch,
        about:about,
        email:email
    })
    const payload={
        username,
        password,
        id:admin._id
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
            res.status(200).json({msg:`logged in user with user id-${user._id}`,token:new_token,user});
        }
        else
        res.status(401).send("password wrong!")
    }
    else
    res.status(401).send("username not present");
})

//edit admin details
router.put("/editDetails",authenticate,async(req,res)=>{
    const {batch,branch,about,email}=req.body;

    const admin=await Admin.findOne({"username":req.user.username});
    if(admin)
    {
        admin.batch=batch;
        admin.about=about;
        admin.branch=branch;
        admin.email=email;
        await admin.save();

        res.status(200).json({msg:"details updated succesfully",admin});
    }
    else
    res.status(404).send("Admin details not found !!please try again")
})
//edit admin password
router.put("/editPassword",authenticate,async(req,res)=>{
    const {new_password,old_password}=req.body;
    try{
        const admin=await Admin.findOne({"username":req.user.username});
        
        if(admin)
        {
            const valid=await bycrypt.compare(old_password,admin.password);
            if(valid==true)
            {
                const hashedPassword=await bycrypt.hash(new_password,10);
                admin.password=hashedPassword;
                await admin.save();
                res.status(200).json({msg:"successfully updated password"})
            }
            else{
                res.status(200).json({error:"old password wrong"})
            }
            
        }
        else{
            res.status(404).send("admin not found!");
        }
    } catch(err)
    {
        console.log(err)
    }
})

//add notes
router.post("/createNotes",authenticate,async(req,res)=>{

    const {course,topic,content,category}=req.body;
    console.log(req.user)
    const admin=await Admin.findOne({"username":req.user.username});
    console.log(admin)
    const new_note=await Note.create({
        course:course,
        topic:topic,
        content:content,
        category:category,
        admin:admin._id
    });
    res.status(201).json({msg:"new notes added successfully",new_note});
    

})

//get the added notes

router.get("/notes",authenticate,async(req,res)=>{
    // console.log(req.user.id)
    const notes=await Note.find({"admin":req.user.id});
    // console.log(notes)
    if(notes!=undefined)
    {
        res.status(200).json(notes)
    }
    else
    res.status(404).send("notes not found!!");
})

//delete a note

router.delete("/deleteNote/:noteId",authenticate,async(req,res)=>{
        const noteId=req.params.noteId;
        const del_note=await Note.findByIdAndDelete(noteId);
        if(del_note){
            res.status(200).json({msg:"task deleted successfully",del_note});
        }
        else
        res.status(403).send("could not process the request!");

})

//edit a note
router.put("/editNote/:noteId",authenticate,async(req,res)=>{
    const noteId=req.params.noteId;
    console.log(noteId)
    const {course,topic,content}=req.body;
    const note_edit=await Note.findById(noteId);
    note_edit.course=course;
    note_edit.topic=topic;
    note_edit.content=content;
    await note_edit.save();

    if(note_edit){
        res.status(200).json({msg:"updated succesfully",note_edit});
    }
    else
    res.status(400).send("could not save the note succesfully !!.please try again");

})

//add a notice
router.post("/notice",authenticate,async(req,res)=>{
    const {notice}=req.body;
    try{
        const new_notice=await Notice.create({
            by:req.user.id,
            announcement:notice,
            name:req.user.username
        });
        res.status(201).json({msg:"successfully added notice",new_notice})
    }catch(err)
    {
        res.status(400).send("error occured!");
    }
    
})


export default router


