
import { Avatar,Card, TextField, Typography,Button, IconButton, BottomNavigation, BottomNavigationAction } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React,{useEffect, useState} from 'react'
import avatar from '../Admin/images/admin.jpg'

import api from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Badge, Key } from '@mui/icons-material';
import axios from 'axios';
function EditUserdetails() {
  const navigate=useNavigate();
 
  const [first,setFirst]=useState();
  const [last,setLast]=useState();
  const [toggle,setToggle]=useState(0);
  const [batch,setBatch]=useState();
  const [branch,setBranch]=useState();
  
 
  const [password,setPassword]=useState('');
  const [new_password,setNewPassword]=useState('');
  const [confirm,setConfirm]=useState('');

  
      useEffect(()=>{
        
        async function getUser(){
          try{
            const resp=await api.get('/user/getUser',{
              headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
              }
            })
            console.log(resp.data)
            if(resp.status==200)
            {
              const {name,batch,branch}=resp.data.user;
              setBatch(batch);
              setBranch(branch);
              setFirst(name.split(" ")[0]);
              setLast(name.split(" ")[1]);
            }
          }catch(err)
          {
            console.log(err);
          }
        }

        getUser()
      },[])

  

  const about=<Card variant="outlined" sx={{padding:2,margin:2,backgroundColor:"#f6cd61"}}>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <Card style={{padding:24,display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center",fontWeight:"bold",height:"70%"}} variant="elevation">
                      <Avatar src={avatar} sx={{width:128,height:128,margin:4,cursor:"pointer"}}>
                  
                      </Avatar>
                      <Typography variant="caption">*upload image less than 1mb</Typography>
                      <Typography variant="subtitle1">{"varunsingh"}</Typography>

                      
                    </Card>
                   
                  </Grid>
                  <Grid container md={8} spacing={2} columnSpacing={2}>
                    <Grid item md={12}>
                        <Card variant="elevation" style={{padding:12}}>
                          <TextField onChange={(e)=>setFirst(e.target.value)}
                           type='text' value={first} label="first name" style={{margin:6,padding:4}} variant='filled' />
                          <TextField onChange={(e)=>setLast(e.target.value)}
                           type='text ' value={last} label="last name" style={{margin:6,padding:4}} variant='filled'  />
                          <TextField 
                          style={{margin:6,padding:4}} value={batch}  onChange={(e)=>setBatch(e.target.value)} type='text' label="edit batch" variant="filled" fullWidth={true} />
                          <TextField style={{margin:6,padding:4}} value={branch}   onChange={(e)=>setBranch(e.target.value)} type='text' label="edit branch" variant="filled" fullWidth={true} />
                          
                        
                     
                      <Button
                      onClick={async()=>{
                        try{
                          const body={
                            batch:batch,
                            name:first+" "+last,
                            branch:branch,
                           
                          }

                          const resp=await api.put("/user/editDetails",body,{
                            headers:{
                              "Authorization":"Bearer "+localStorage.getItem("token")
                            }
                          })
                          if(resp.status==201)
                          {
                            
                            console.log("successful request")
                           navigate('/user/home')
                            
                          }

                        }catch(err)
                        {
                          console.log(err)
                        }
                      }}  
                       style={{margin:12,fontWeight:"bold",float:"right",backgroundColor:"black"}} variant='contained'>Save Changes</Button>
                     
                        </Card>
                    </Grid>
                    

                  </Grid>

                </Grid>
              </Card>

  const security= <div style={{display:"flex",flexDirection:"column",width:"80%",justifyContent:"center",alignItems:"center",marginTop:24,marginLeft:48}}>
                  <Card style={{padding:24,marginTop:24,backgroundColor:"#e9a452"}} variant="outlined">
                  <TextField style={{padding:2,margin:2,marginTop:6,paddingLeft:2}} type='password' variant="outlined"
                    onChange={(e)=>setPassword(e.target.value)}
                     fullWidth={true} value={password} label="Old Password" />
                    <TextField style={{padding:2,margin:2,marginTop:6,paddingLeft:2}} helperText="Password must be minimum 6+" type='password' variant="outlined" 
                    onChange={(e)=>setNewPassword(e.target.value)}
                    fullWidth={true} value={new_password} label="New Password" />
                    <TextField style={{padding:2,margin:2,marginTop:6,paddingLeft:2}} type='password' variant="outlined" 
                    onChange={(e)=>setConfirm(e.target.value)}
                    fullWidth={true} value={confirm} label="Confirm" />
                    <Button
                    
                      onClick={async()=>{
                        try{
                          if(confirm!==new_password)
                          alert('confirm password did not match the new password')
                          else
                          {
                            const resp=await api.put('/admin/editPassword',{
                              old_pass:password,
                              new_pass:new_password
                            },{
                              headers:{
                                "Authorization":"Bearer "+localStorage.getItem("token")
                              }
                            })
                            if(resp.data.msg)
                            {
                              console.log("updated successfully");
                              localStorage.removeItem("token");
                              window.location="/"
                            }
                            else if(resp.data.error){
                              alert('old password is wrong!')
                            }
                            else
                            {
                              alert('error !please try again after sometime')
                            }
                          }
                        }catch(err){
                          console.log(err)
                        }
                      }}
                     style={{float:"right",backgroundColor:"black",marginTop:16}} variant="contained">save changes</Button>
                  </Card>
                    

                   

                  

                  </div>    

                  return (
                    <div style={{marginTop:96,padding:12,marginLeft:64}}>
                      <IconButton size="large" onClick={()=>navigate('/user/detail')}>
                        <ArrowBack/>
                      </IconButton>
                      <Typography style={{marginRight:8,fontWeight:"bold"}} variant="h5">Account.</Typography>
                      <Typography style={{marginRight:8}} variant="subtitle2">Edit user details</Typography>
                      <BottomNavigation
                      value={toggle}
                      onChange={(e,newValue)=>{
                        setToggle(newValue)
                      }}
                      >
                        <BottomNavigationAction label="Security" icon={<Key/>}/>
                        <BottomNavigationAction label="General" icon={<Badge/>}/>

                      </BottomNavigation>
                      {toggle==0?
                      
                      
                      security
                      
                      :about}
                      
                     
                      
                    </div>
                  )
}

export default EditUserdetails