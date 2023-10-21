import express from 'express';
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import Admin from '../models/admin.js'
import jwt from 'jsonwebtoken'
import authenticate from '../middleware/authenticate.js';
import Note from '../models/notes.js';
import Notice from '../models/notice.js';
const router=express.Router();


//signup a new user
router.post("/signup",async(req,res)=>{
        const {name,username,password,branch,batch}=req.body;
        const hash_password=await bcrypt.hash(password,10);
        const user=await User.create({
            name:name,
            username:username,
            password:hash_password,
            branch:branch,
            batch:batch
        })
        res.status(201).json({msg:"new user created !",user});

        

})
//login a user
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
   
    const user=await User.findOne({"username":username});
    console.log(user)
    if(user!=undefined)
    {

        const valid=await bcrypt.compare(password,user.password);
        if(valid)
        {
            const payload={
                username:username,
                password:password,
                id:user._id
            }
            const token=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2h'});

            res.status(200).json({msg:"loggedinsuccessfully",token});
        }
        else
        {
            res.status(403).send("wrong password");
        }
    }
    else
    {
        res.status(404).send("user not found!");
    }
})

//follow a topper ie .add him to your favorites
router.get('/addFollowers/:adminId',authenticate,async(req,res)=>{

    const adminId=req.params.adminId;
    const admin=await Admin.findById(adminId);

});

//get all the courses of all the admin
router.get('/notes',authenticate,async(req,res)=>{
    console.log("have to get all the notes");
    try{
        const notes=await Note.find({});
        const user=await User.findOne({"username":req.user.username})
        res.status(200).json({msg:"all the notes",notes,user});

    }catch(error)
    {
        res.status(400).send("error");
        console.log(error);
    }
})
//get a particular note
router.get("/note/:noteId",authenticate,async(req,res)=>{
    const noteId=req.params.noteId
    try{
            const note=await Note.findById(noteId);
            if(note!=undefined)
            {
                res.status(200).json({msg:"found",note})
            }
            else
            {
                res.status(404).send("not found");
            }
    }catch(err)
    {
        console.log(err);
        res.status(400).send("error occured")
    }
})
//get all the notices 

router.get("/notice",authenticate,async(req,res)=>{
    try{
        const notices=await Notice.find({});
        res.status(200).json({msg:"successfully found",notices});
    }catch(err)
    {
        res.status(400).send("error occured!")
    }
})
export default router;