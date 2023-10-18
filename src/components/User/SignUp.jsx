import { TextField, Typography,Card, Button, IconButton } from '@mui/material'
// import Grid from '@mui/material/Unstable_Grid2/Grid2'
import {Grid} from '@mui/material';

import React, { useState } from 'react'
import api from '../../api/api.js';
import { useSetRecoilState } from 'recoil';
import User from '../../store/atom/userProfile';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, ArrowBack } from '@mui/icons-material';
function SignUp() {
    const navigate=useNavigate();
    const setUserDetails=useSetRecoilState(User);
    const [first,setFirst]=useState('');
    const [last,setLast]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');
    const [batch,setBatch]=useState('');
    const [branch,setBranch]=useState('');
  return (
    <div style={{marginTop:48}}>
        <IconButton size='large' style={{padding:2,margin:16}} onClick={()=>window.location="/"}><ArrowBack/></IconButton>
        <Grid container spacing={2}>
            <Grid md={6} style={{textAlign:"center",backgroundColor:"#aec993",padding:12,marginTop:12}} fontWeight={"bold"}  item>
                <Typography variant='h1'>GET</Typography>
                <Typography variant='h1'>READY</Typography>
                <Typography variant='h1'>FOR</Typography>
                <Typography variant='h1'>EXAMS</Typography>

            </Grid>

            <Grid  md={6}  style={{padding:12,display:"flex",justifyContent:"center"}}   item>
                <Card sx={{maxWidth:400}} variant="outlined" style={{padding:24,backgroundColor:'#e9a451'}}>
                    <AccountCircle fontSize='large'/>
                <TextField fullWidth={true} value={first}
                onChange={(e)=>setFirst(e.target.value)}
                style={{padding:4,marginTop:6}} type="text" variant='outlined' label="First Name" />
                <TextField fullWidth={true} value={last}
                onChange={(e)=>setLast(e.target.value)}
                style={{padding:4,marginTop:6}} type='text' variant='outlined' label="Last Name" />
                <TextField fullWidth={true} value={username}
                onChange={(e)=>setUsername(e.target.value)}
                style={{padding:4,marginTop:6}} type='text' variant='outlined' label="Username" />
                <TextField fullWidth={true} value={password}
                onChange={(e)=>setPassword(e.target.value)}
                style={{padding:4,marginTop:6}} helperText="Password must be minimum 6 digits+" type='password' variant='outlined' label="Password" />
                <TextField fullWidth={true} value={confirm}
                onChange={(e)=>setConfirm(e.target.value)}
                style={{padding:4,marginTop:6}} type='password' variant='outlined' label="Confirm Password" />
                <TextField fullWidth={true} value={batch}
                onChange={(e)=>setBatch(e.target.value)}
                style={{padding:4,marginTop:6}} type='text' helperText="Passout-Year" variant='outlined' label="Batch" />
                <TextField fullWidth={true} value={branch}
                onChange={(e)=>setBranch(e.target.value)}
                style={{padding:4,marginTop:6}} type='text' helperText="Enter branch code" variant='outlined' label="Branch" />
                <hr/>
                <Button fullWidth={true} style={{margin:6,backgroundColor:"black"}}
                onClick={async()=>{
                    const userData={
                        username:username,
                        password:password,
                        name:`${first} ${last}`,
                        batch:batch,
                        branch:branch
                    }
                    try{
                        const resp=await api.post('/user/signup',userData);
                        setUserDetails({...userData});
                        if(resp.status==201)
                        {
                            navigate('/');
                        }
                        

                    }catch(error)
                    {
                        console.log(error);
                    }
                }}
                variant="contained">Create Account</Button>
                </Card>
               

            </Grid>

        </Grid>
    </div>
  )
}

export default SignUp