import {  Box, Card, CardHeader, Typography,Avatar, CardContent, Icon, List, ListItem, ListItemIcon, ListItemText, TextField, IconButton ,} from '@mui/material'
// import Avatar from '@mui/material'
import React,{useState} from 'react'
import {Button} from '@mui/material'

import img from './images/admin.jpg'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { ArrowBack, Edit, Email, ManageAccounts, MenuBook, NavigateBefore, Place, School } from '@mui/icons-material'
import { Mail } from '@mui/icons-material'
import { useRecoilValue } from 'recoil'

import admin from '../../store/atom/adminProfile'
import adminnoteState from '../../store/atom/adminNote'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api.js'
import { Image } from 'cloudinary-react'
//List-it/src/assets/avatar_25.jpg
function AdminPanel() {
  const profile=useRecoilValue(admin);
  const note=useRecoilValue(adminnoteState);
  const navigate=useNavigate();
  const [notice,setNotice]=useState('');
  console.log(profile)
  return (
    <div style={{display:"flex",marginLeft:256,marginTop:32,padding:24}}>
        <Box >
        <IconButton
        size="large"
        
        onClick={()=>{
            navigate('/admin/notes');
        }}><ArrowBack/></IconButton>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <div>
              <Typography variant="h4">Welcome, {profile.username}</Typography>
              <Typography variant="body2">Admin:Dashboard</Typography>
            </div>
            
            <div >
             <IconButton 
             onClick={()=>navigate('/admin/editDetails')}
             size='large'><ManageAccounts/> </IconButton>
             
            </div>

          </div>
            
            <Card style={{width:"90%",backgroundColor:"#f6cd61",marginRight:124,paddingRight:128}}>
                <CardHeader
                style={{paddingTop:128,paddingLeft:24,paddingBottom:12,fontWeight:"bold"}}
                avatar={
                    <Avatar  sx={{width:108,height:108}} aria-label="profile pic">
                            <Image  cloudName="dre4asvrb" publicId={profile.publicId}/>
                    </Avatar>
                }
                title={profile.username}
                subheader="Lapulga"
                 />
                 <CardContent>

                 </CardContent>
            </Card>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid container md={5}>
                    <Grid item md={12}>
                      <Card variant="elevation" style={{margin:24,padding:12,textAlign:"center"}} >
                      <Typography variant='h5'>{note.length}</Typography>
                        <Typography variant="caption">Notes Added</Typography>
                      </Card>
                        
                    </Grid>
                    <Grid item md={12}>
                        <Card variant="elevation" style={{margin:24,padding:12}}>
                        <Typography variant="h6">About</Typography>
                        <Typography style={{margin:4,textAlign:"left"}} variant="body1">{profile.about}</Typography>
                        <List>
                          <ListItem disablePadding>
                            <ListItemIcon>
                              <MenuBook/>
                            </ListItemIcon>
                            <ListItemText >
                             Undergrad at {profile.branch}
                            </ListItemText>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon>
                              <School/>
                            </ListItemIcon>
                            <ListItemText>Batch of '{profile.batch}</ListItemText>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon>
                              <Email/>
                            </ListItemIcon>
                            <ListItemText>{profile.email}</ListItemText>
                          </ListItem>
                        </List>
                        </Card>
                    </Grid>
                    
                </Grid>
                <Grid container md={7}>
                  <Grid item md={12}>
                    <Card sx={{maxWidth:600}} variant="elevation" style={{margin:24,padding:12}}>
                      <TextField onChange={(e)=>{
                        setNotice(e.target.value)
                      }} value={notice} type='text' variant='outlined' multiline  minRows={4} fullWidth={true} label="Announcements" />
                        <Button onClick={async()=>{
                          try{
                            const resp=await api.post("/admin/notice",{notice},{
                              headers:{
                                "Authorization":"Bearer "+localStorage.getItem("token")
                              }
                            })
                            if(resp.status==201)
                            console.log("notice uploaded!");
                          }catch(error)
                          {
                            console.log(error);
                          }
                        }}  variant='contained' style={{backgroundColor:"black",padding:4,margin:8,float:"right"}}>Post</Button>
                    </Card>

                  </Grid>
                  <Grid item md={12}>
                    <Card variant="elevation" style={{display:"flex",margin:24,padding:12,justifyContent:"space-evenly",alignContent:"center"}}>
                      
                       
                        
                    </Card>
                  </Grid>

                </Grid>
          </Grid>
        </Box>
        
    </div>
  )
}

export default AdminPanel