
import { Avatar,Card, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React,{useState} from 'react'
import avatar from './images/admin.jpg'
import { useRecoilValue } from 'recoil';
import admin from '../../store/atom/adminProfile.jsx';
function Editdetails() {
  const [toggle,setToggle]=useState(true);
  const [batch,setBatch]=useState('');
  const [branch,setBranch]=useState('');
  const [share,setShare]=useState('');
  const [email,setEmail]=useState('');
  const adminData=useRecoilValue(admin);
  console.log(adminData)
  const about=<div>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <Card style={{padding:24,display:"flex", justifyContent:"center",fontWeight:"bold",height:"80%"}} variant="elevation">
                      <Avatar src={avatar} sx={{width:128,height:128}}>
                      
                      </Avatar>
                      <hr/>
                      <Typography variant="h6">{adminData.username}</Typography>
                    </Card>
                   
                  </Grid>
                  <Grid container md={8} spacing={2} columnSpacing={2}>
                    <Grid item md={6}>
                        <Card variant="elevation" style={{padding:12}}>
                          <TextField style={{margin:6,padding:4}} value={adminData.batch} onChange={(e)=>setBatch(e.target.value)} type='text' label="edit batch" variant="outlined" fullWidth={true} />
                          <TextField style={{margin:6,padding:4}} value={adminData.branch} onChange={(e)=>setBranch(e.target.value)} type='text' label="edit branch" variant="outlined" fullWidth={true} />
                          <TextField style={{margin:6,padding:4}} value={adminData.email} onChange={(e)=>setEmail(e.target.value)} type='text' label="edit email" variant="outlined" fullWidth={true} />

                        </Card>
                    </Grid>
                    <Grid item md={6}>
                      <TextField value={adminData.about} onChange={(e)=>setShare(e.target.value)} type='text' variant="outlined" label="share something else.lol!" fullWidth={true} multiline minRows={4} />
                    </Grid>

                  </Grid>

                </Grid>
              </div>
                  return (
                    <div style={{marginTop:48,padding:12,margin:12}}>
                      <Card variant="outlined" style={{padding:12,margin:12}}>
                      {about}
                      </Card>
                     
                      
                    </div>
                  )
}

export default Editdetails