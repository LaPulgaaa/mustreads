import express from 'express';
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import Admin from '../models/admin.js'
import jwt from 'jsonwebtoken'
import authenticate from '../middleware/authenticate.js';
import Note from '../models/notes.js';
import Notice from '../models/notice.js';
const router=express.Router();


//send details of loggedin user

router.get("/details",authenticate,async(req,res)=>{
    
    try{
        
        const user=await User.findOne({"username":req.user.username});
        if(user)
        res.status(200).json({msg:"found user details",user})
        else
        res.status(404).send("not found user")
    }
    catch(err)
    {
        res.status(400).send(err);
    }
})

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

//add a note to user's schema profile
router.get("/addFav/:noteId",authenticate,async(req,res)=>{
    console.log("to add to favorites");
    const noteId=req.params.noteId;

    const user=await User.findOne({"username":req.user.username});
    const note=await Note.findById(noteId);

    if(note && user)
    {
        note.published=true;
        await note.save();
        const new_favs=[...user.favs,note._id];
        user.favs=new_favs;
        await user.save();
        console.log(new_favs);
        
        res.status(200).json({msg:"successfully added to favorites",new_favs});
    }
    else{
        res.status(404).send("user or note not found");
    }
})

//remove from favs

router.get('/removeFav/:noteId',authenticate,async (req,res)=>{
    console.log("to remove from favs")
    const noteId=req.params.noteId;

    try{
        const fav=await Note.findById(noteId);
        console.log(fav);
    const user=await User.findOne({"username":req.user.username});
    if(fav && user)
    {
        fav.published=false;
        await fav.save()
        const new_favs=user.favs.filter((note)=>{
            console.log(note._id+"---"+fav._id);
            if(note._id!=fav._id)
            return note
        })
        user.favs=new_favs;
        await user.save();
        console.log(new_favs)
        // const new_favs=user.favs;
        res.status(200).json({msg:"removed from favorite",new_favs});
    }
    else

    res.status(404).send("note or user not found ");

    }catch(err)
    {
        res.status(400).send(err);
    }
})

//get the fav notes 

router.get('/getFavs',authenticate,async(req,res)=>{
    try{
        const user=await User.findOne({"username":req.user.username}).populate('favs').exec();
      
        if(user)
        {
            const favs=user.favs;
            res.status(200).json({msg:"successfull fetched favs",favs});
        }
    }catch(err)
    {
        console.log("something is wrong ");
        res.status(400).send("error occured");
    }
})



//edit user details

router.put('/editDetails',authenticate,async(req,res)=>{
    const {batch,branch,name}=req.body;

    const user=await User.findOne({"username":req.user.username});
    if(user)
    {
        user.batch=batch;
        user.branch=branch;
        user.name=name;
        await user.save();

        res.status(200).send("user details updated successfully");
    }
    else
    res.status(404).send("user not found");
})

//edit password or username
router.put('/editSecurity',authenticate,async(req,res)=>{
    const {username,old_pass,new_pass}=req.body;

    const user=await User.findOne({"username":username});
    const {password}=user;

    const compare=await bcrypt.compare(old_pass,password);
    if(compare==true)
    {
        user.username=username;
        const hash=await bcrypt.hash(new_pass,10);
        user.password=hash;
        await user.save();

        res.status(201).send("updated successfully.");
    }
    else
    res.status(401).send("wrong username or password")


})

export default router;