import React, { useState } from 'react'
import { Grid, Typography,Card,Button,TextField } from '@mui/material'
import { AdminPanelSettings } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api.js'
function SignAdmin() {
    const navigate=useNavigate();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [branch,setBranch]=useState('');
    const [batch,setBatch]=useState('');
    const [confirm,setConfirm]=useState('');
    
  return (
    <div style={{marginTop:48}}>
        <Grid container>
            <Grid item style={{textAlign:"left",padding:48}} md={6}>
                <Typography variant='h1'>HELP </Typography>
                <Typography variant='h1'>YOUR </Typography>
                <Typography variant='h1'>FRIENDS</Typography>
                <Typography variant='h1'></Typography>
                <Typography variant='h6' style={{fontWeight:"bold"}}>Add your notes and help your friends for the coming exams
                </Typography>
            </Grid>
            <Grid style={{display:'flex',justifyContent:"center"}} item md={6}>
                <Card style={{width:400,padding:48,backgroundColor:'#aec993'}} sx={{maxWidth:400}} variant='outlined'>

                    <AdminPanelSettings style={{}} fontSize='large'/>
                    <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>Admin</Typography>

                    <TextField style={{padding:4,margin:4}} value={username} type='text' variant='outlined' label="username" 
                    fullWidth={true} onChange={(e)=>setUsername(e.target.value)} />
                    <TextField style={{padding:4,margin:4}} value={password} type='password' variant='outlined' label="password"
                    onChange={(e)=>setPassword(e.target.value)}
                     fullWidth={true}/>

                    <TextField style={{padding:4,margin:4}} value={confirm} type='password' variant='outlined' label="confirm password"
                    onChange={(e)=>setConfirm(e.target.value)}
                     fullWidth={true}/>

                    <TextField style={{padding:4,margin:4}} value={branch}
                    onChange={(e)=>setBranch(e.target.value)}
                     type='text' variant='outlined' label="Branch" fullWidth={true} />

                    <TextField style={{padding:4,margin:4}} value={batch}
                    onChange={(e)=>setBatch(e.target.value)}
                    type='text' variant='outlined'
                    helperText="please enter your batch"
                     label="20**" fullWidth={true} />

                    <Button
                     fullWidth={true}  variant='contained' onClick={async()=>{
                        if(confirm!=password)
                        {
                            alert("password enteries do not match!");
                            setPassword('');
                            setConfirm('');
                        }
                        else{
                            console.log(username,password,batch,branch)
                            const body={
                                username:username,
                                password:password,
                                batch:batch,
                                branch:branch
                            }
                            const resp=await api.post('/admin/signup',body);
                            const {token}=resp.data;
                            console.log(token)
                            localStorage.setItem("token",token);
                            
                            navigate('/admin/notes');

                            

                        }
                           
                     }}>SIGN UP</Button>
                    <hr/>
                    

                </Card>
            </Grid>
        </Grid>
        
        
    </div>
  )
}

export default SignAdmin