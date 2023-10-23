import React, { useState } from 'react'
import { Grid, Typography,Card,Button,TextField, IconButton, CardContent, CardHeader, Avatar } from '@mui/material'
import { AccountCircle, AdminPanelSettings, ArrowBack } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api.js'
function SignAdmin() {
    const navigate=useNavigate();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [branch,setBranch]=useState('');
    const [batch,setBatch]=useState('');
    const [about,setAbout]=useState('');
    const [email,setEmail]=useState('');
    const [confirm,setConfirm]=useState('');
    
  return (
    <div style={{marginTop:48}}>
        <IconButton style={{margin:12}} size='large' onClick={()=>window.location="/"}><ArrowBack/></IconButton>
       
            <Card style={{padding:8}} variant="outlined">
            <Grid  container  style={{display:"flex"}} spacing={4}>
               
                
               <Grid item md={6}>
                  
                   <AdminPanelSettings style={{}} fontSize='large'/>
                   <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>Admin</Typography>
                   <CardHeader 
                   avatar={
                       <Avatar sx={{width:100,height:100,backgroundColor:"cyan"}}>
                           <AccountCircle  />
                       </Avatar>
                   }
                   />
                           <TextField style={{padding:4,margin:4}} value={username} type='text' variant='outlined' label="username" 
                       fullWidth={true} onChange={(e)=>setUsername(e.target.value)} />
                       <TextField style={{padding:4,margin:4}} helperText="*atleast 6 digits" value={password} type='password' variant='outlined' label="password"
                       onChange={(e)=>setPassword(e.target.value)}
                       fullWidth={true}/>

                       <TextField style={{padding:4,margin:4}} value={confirm} type='password' variant='outlined' label="confirm password"
                       onChange={(e)=>setConfirm(e.target.value)}
                       fullWidth={true}/>
                   
               </Grid>

               <Grid item md={6}>
               
               <CardContent>
               
               <TextField style={{padding:4,margin:4}} value={branch}
               onChange={(e)=>setBranch(e.target.value)}
                type='text' variant='outlined' label="Branch" fullWidth={true} />

               <TextField style={{padding:4,margin:4}} value={batch}
               onChange={(e)=>setBatch(e.target.value)}
               type='text' variant='outlined'
               helperText="please enter your batch"
                label="20**" fullWidth={true} />


               <TextField style={{padding:4,margin:4}}  value={email}
               onChange={(e)=>setEmail(e.target.value)}
               type='text' variant='outlined'
               
               label="admin@gmail.com" fullWidth={true} />


               <TextField style={{padding:4,margin:4}} multiline minRows={4} value={about}
               onChange={(e)=>setAbout(e.target.value)}
               type='text' variant='outlined'
               
                label="write something to share with the world..." fullWidth={true} />

              
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
                           branch:branch,
                           about:about
                       }
                       const resp=await api.post('/admin/signup',body);
                       const {token}=resp.data;
                       console.log(token)
                       localStorage.setItem("token",token);
                       
                       navigate('/admin/notes');

                       

                   }
                      
                }}>SIGN UP</Button>
               </CardContent>
              
               </Grid>
          
              
               
               <hr/>
               

           
       </Grid>
            </Card>
            
        
        
        
    </div>
  )
}

export default SignAdmin