import React, { useState } from 'react'
import { Box, Button, Card,  Divider,  Grid,  TextField, Typography } from '@mui/material'
import api from '../api/api.js'
import { AccountCircle,AdminPanelSettings } from '@mui/icons-material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import admin from '../store/atom/adminProfile.jsx'
import User from '../store/atom/userProfile.jsx'
function Login() {
  // const setuserData=useSetRecoilState(User);
  const navigate=useNavigate();
  const [username,setUsername]=useState('');
  const [user_password,setUserPassword]=useState('');
  const [adminname,setAdminname]=useState('');
  const [admin_password,setAdminPassword]=useState('');
  const [profile,setProfile]=useRecoilState(admin);

  // console.log(profile)
  return (
    <div>
      <Box style={{display:'flex',justifyContent:'center'}}>
      <Grid2 container spacing={16}>
        <Grid2 item md={12} lg={6} >
        <Card style={{width:400,padding:24,backgroundColor:'#e9a451'}} sx={{maxWidth:400}} variant='outlined'>

            <AdminPanelSettings style={{}} fontSize='large'/>
            <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>Admin</Typography>

           <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="username" value={adminname} 
           onChange={(e)=>setAdminname(e.target.value)}
            fullWidth={true} />
          <TextField style={{padding:4,margin:4}} type='password' variant='outlined' 
          value={admin_password}
          onChange={(e)=>setAdminPassword(e.target.value)}
          label="password" fullWidth={true}/>
          <Button fullWidth={true} style={{backgroundColor:"black"}}  variant='contained' onClick={async()=>{
            const resp=await api.post("/admin/login",{
              username:adminname,
              password:admin_password
            });
            const {token,user}=resp.data;
           console.log(user);
            const entry={
              username:user.username,
              branch:user.branch,
              batch:user.batch,
              about:user.about,
              email:user.email,
              publicId:user.publicId
              
            }

            setProfile(entry);
            
            localStorage.setItem("token",token);
            navigate('/admin/notes')

          }}>LOG IN</Button>
          <hr/>
          <Typography variant='caption'  >DO NOT HAVE AN ACCOUNT
          <Link to="/admin/signup" style={{padding:2}}>SIGN UP</Link>
          </Typography>
      
        </Card>
        </Grid2>
      <Grid2 item  md={12} lg={6} >
      <Card style={{width:400,padding:24,backgroundColor:"#f6cd61"}} sx={{maxWidth:400}} variant='outlined'>

          <AccountCircle style={{}} fontSize='large'/>
          <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>User</Typography>

      <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="username" value={username}
      fullWidth={true} 
      onChange={(e)=>setUsername(e.target.value)}
      
     />
      <TextField style={{padding:4,margin:4}} type='password' variant='outlined' label="password"
      value={user_password}
      onChange={(e)=>setUserPassword(e.target.value)}
       fullWidth={true}/>
      <Button variant='contained'
      onClick={async()=>{
        
        try{
            const resp=await api.post("/user/login",({
              username,
              password:user_password
            }))
              console.log(resp.data)
            if(resp.status==200)
            {
              const {token}=resp.data;
              localStorage.setItem("token",token);
              console.log(resp.data.token);
              // const user=resp.data.user;
              // setuserData({...user})
              navigate('/user/home');
            }
        }catch(error)
        {
          console.log(error);
        }
      }}
       style={{backgroundColor:"black"}} fullWidth={true}>LOG IN</Button>
      <hr/>
          <Typography variant='caption'  >DO NOT HAVE AN ACCOUNT
          <Link style={{paddingLeft:4}} to="/user/signup" >SIGN UP</Link>
          </Typography>
      
    </Card>
      </Grid2>
  
      </Grid2>
     
      </Box>
        
    </div>
  )
}

export default Login