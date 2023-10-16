import {  Box, Card, CardHeader, Typography,Avatar, CardContent, Icon, List, ListItem, ListItemIcon, ListItemText, TextField, IconButton ,} from '@mui/material'
// import Avatar from '@mui/material'
import React from 'react'
import {Button} from '@mui/material'
import img from './images/admin.jpg'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Edit, ManageAccounts, MenuBook, NavigateBefore, Place, School } from '@mui/icons-material'
import { Mail } from '@mui/icons-material'
import { useRecoilValue } from 'recoil'

import admin from '../../store/atom/adminProfile'
import adminnoteState from '../../store/atom/adminNote'
import { useNavigate } from 'react-router-dom'
//List-it/src/assets/avatar_25.jpg
function AdminPanel() {
  const profile=useRecoilValue(admin);
  const note=useRecoilValue(adminnoteState);
  const navigate=useNavigate();
  console.log(profile)
  return (
    <div style={{display:"flex",marginLeft:256,marginTop:32,padding:24}}>
        <Box >
        <Button 
        onClick={()=>{
            navigate('/admin/notes');
        }}
        style={{margin:6,padding:6,backgroundColor:"black"}} sx={{borderRadius:2}} variant='contained' startIcon={<NavigateBefore/>}>Back</Button>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <div>
              <Typography variant="h4">Welcome, {profile.username}</Typography>
              <Typography variant="body2">Admin:Dashboard</Typography>
            </div>
            
            <div >
             <Button 
             onClick={()=>navigate('/admin/editDetails')}
             style={{margin:6,padding:6,backgroundColor:"black"}} sx={{borderRadius:2}} variant='contained' startIcon={<ManageAccounts/>}>Edit </Button>
             
            </div>

          </div>
            
            <Card style={{width:"90%",backgroundColor:"#8caba8",marginRight:124,paddingRight:128}}>
                <CardHeader
                style={{paddingTop:128,paddingLeft:24,paddingBottom:12,fontWeight:"bold"}}
                avatar={
                    <Avatar src={img} sx={{width:108,height:108}} aria-label="profile pic">
                            
                    </Avatar>
                }
                title={profile.username}
                subheader="Lapulga"
                 />
                 <CardContent>

                 </CardContent>
            </Card>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid container md={4}>
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
                            <ListItemText>
                             Undergrad at {profile.branch}
                            </ListItemText>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon>
                              <School/>
                            </ListItemIcon>
                            <ListItemText>Batch of '{profile.batch}</ListItemText>
                          </ListItem>
                        </List>
                        </Card>
                    </Grid>
                    
                </Grid>
                <Grid container md={8}>
                  <Grid item md={12}>
                    <Card variant="elevation" style={{margin:24,padding:12}}>
                      <TextField  type='text' variant='outlined' multiline  minRows={4} fullWidth={true} label="Share your thoughts...." />
                        <Button  variant='contained' style={{backgroundColor:"black",padding:4,margin:8,display:"flex"}}>Post</Button>
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