import express from 'express';
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import Admin from '../models/admin.js'
import jwt from 'jsonwebtoken'
import authenticate from '../middleware/authenticate.js';
const router=express.Router();


//signup a new user
router.post("/signup",async(req,res)=>{
        const {name,username,password,branch,batch}=req.body;
        const hash=await bcrypt.hash(password,10);
        const user=await User.create({
            name:name,
            username:username,
            password:hash,
            branch:branch,
            batch:batch
        })
        res.status(201).json({msg:"new user created !",user});

        

})
//login a user
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({"username":username});

    if(user)
    {

        const valid=await bcrypt.compare(password,user.password);
        if(valid)
        {
            const payload={
                username:username,
                password:password,
                id:user._id
            }
            const token=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET_USER,{expiresIn:'2h'});

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

router.get('/addFollowers/:adminId',authenticate,async(req,res)=>{

    const adminId=req.params.adminId;
    const admin=await Admin.findById(adminId);

})
export default router;