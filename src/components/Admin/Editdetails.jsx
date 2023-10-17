
import { Avatar,Card, TextField, Typography,Button, IconButton, BottomNavigation, BottomNavigationAction } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React,{useState} from 'react'
import avatar from './images/admin.jpg'
import { useRecoilState, useRecoilValue } from 'recoil';
import admin from '../../store/atom/adminProfile.jsx';
import api from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Badge, Key } from '@mui/icons-material';
function Editdetails() {
  const navigate=useNavigate();
  const [adminData,setAdmindata]=useRecoilState(admin);
  const [toggle,setToggle]=useState(0);
  const [batch,setBatch]=useState(adminData.batch);
  const [branch,setBranch]=useState(adminData.branch);
  const [share,setShare]=useState(adminData.about);
  const [email,setEmail]=useState(adminData.email);
  const [password,setPassword]=useState('');
  const [new_password,setNewPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  
  const about=<div>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <Card style={{padding:24,display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center",fontWeight:"bold",height:"70%"}} variant="elevation">
                      <Avatar src={avatar} sx={{width:128,height:128,margin:4}}>
                      
                      </Avatar>
                      <Typography variant="caption">*upload image less than 1mb</Typography>
                      <Typography variant="subtitle1">{adminData.username}</Typography>
                      
                    </Card>
                   
                  </Grid>
                  <Grid container md={8} spacing={2} columnSpacing={2}>
                    <Grid item md={12}>
                        <Card variant="elevation" style={{padding:12}}>
                          <TextField style={{margin:6,padding:4}} value={batch}  onChange={(e)=>setBatch(e.target.value)} type='text' label="edit batch" variant="filled" fullWidth={true} />
                          <TextField style={{margin:6,padding:4}} value={branch}   onChange={(e)=>setBranch(e.target.value)} type='text' label="edit branch" variant="filled" fullWidth={true} />
                          <TextField style={{margin:6,padding:4}} value={email}   onChange={(e)=>setEmail(e.target.value)} type='text' label="edit email" variant="filled" fullWidth={true} />
                        
                      <TextField style={{margin:6,padding:4}} value={share}  onChange={(e)=>setShare(e.target.value)} type='text' variant="filled" label="share something else.lol!" fullWidth={true} multiline minRows={4} />
                      <Button
                      onClick={async()=>{
                        try{
                          const body={
                            batch:batch,
                            about:share,
                            branch:branch,
                            email:email
                          }

                          const resp=await api.put("/admin/editDetails",body,{
                            headers:{
                              "Authorization":"Bearer "+localStorage.getItem("token")
                            }
                          })
                          if(resp.status==200)
                          {
                            setAdmindata({...adminData,...body});
                            console.log("successful request")
                           navigate('/admin/dashboard')
                            
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
              </div>

  const security= <div style={{display:"flex",flexDirection:"column",width:"80%",justifyContent:"center",alignItems:"center",marginTop:24,marginLeft:48}}>
                  <Card style={{padding:24,marginTop:24}} variant="outlined">
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
                              old_password:password,
                              new_password:new_password
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
                      <IconButton size="large" onClick={()=>navigate('/admin/dashboard')}>
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
                        <BottomNavigationAction label="General" icon={<Badge/>}/>
                        <BottomNavigationAction label="Security" icon={<Key/>}/>

                      </BottomNavigation>
                      {toggle==0?
                      <Card variant="outlined" style={{padding:12,margin:12}}>
                      
                      {about}
                      </Card>
                      :security}
                      
                     
                      
                    </div>
                  )
}

export default Editdetails