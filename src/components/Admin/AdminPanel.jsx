import {  Box, Card, CardHeader, Typography,Avatar, CardContent, Icon, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
// import Avatar from '@mui/material'
import React from 'react'
import img from './images/admin.jpg'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Place } from '@mui/icons-material'
import { Mail } from '@mui/icons-material'
import { useRecoilValue } from 'recoil'

import admin from '../../store/atom/adminProfile'
//List-it/src/assets/avatar_25.jpg
function AdminPanel() {
  // const admin=useRecoilValue(admin)
  return (
    <div style={{display:"flex",marginLeft:256,marginTop:48,padding:24}}>
        <Box >
            <Typography variant="h4">Profile</Typography>
            <Typography variant="body2">Admin:Dashboard</Typography>
            <Card style={{width:1200,backgroundColor:"#8caba8",marginRight:124,paddingRight:128}}>
                <CardHeader
                style={{paddingTop:128,paddingLeft:24,paddingBottom:12,fontWeight:"bold"}}
                avatar={
                    <Avatar src={img} sx={{width:108,height:108}} aria-label="profile pic">
                            V
                    </Avatar>
                }
                title="Varun Singh"
                subheader="Lapulga"
                 />
                 <CardContent>

                 </CardContent>
            </Card>
            <Grid container rowSpacing={4} columnSpacing={4}>
          <Grid container md={4}>
                <Grid item md={12}>
                  <Card variant="elevation" style={{margin:24,padding:12}}>
                  <Typography variant="h6">About</Typography>
                  <Typography style={{margin:4,textAlign:"left"}} variant="body1">Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer</Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <Place/>
                      </ListItemIcon>
                      <ListItemText>
                      Live at Andorra
                      </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <Mail/>
                      </ListItemIcon>
                      <ListItemText>admin@gmail.com</ListItemText>
                    </ListItem>
                  </List>
                  </Card>
                </Grid>
                <Grid item md={12}>
                  
                </Grid>
          </Grid>
        </Grid>
        </Box>
        
    </div>
  )
}

export default AdminPanel