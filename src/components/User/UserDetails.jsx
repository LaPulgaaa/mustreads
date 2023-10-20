
import React from 'react'
import { Avatar, Card, CardHeader, CardMedia, Grid, List, Typography,ListItem,ListItemIcon,ListItemText } from '@mui/material'
import { MenuBook,School,Email } from '@mui/icons-material'
import cover from '../Admin/images/cover.jpg'
import { useRecoilValue } from 'recoil'


import User from '../../store/atom/userProfile'
const UserDetails = () => {
    const userDetails=useRecoilValue(User);
    console.log(userDetails)
  return (
    <div style={{marginTop:48,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography sx={{padding:8}}  variant="h5">Welcome back, {userDetails.username}</Typography>
        <Card  variant="outlined" sx={{maxWidth:"80%",width:"100%"}}>
        
            <CardMedia component={"img"} height={"304"} image={cover}/>
            <CardHeader  avatar={
                <Avatar sx={{width:74,height:74}}>{userDetails.username.charAt(0)}</Avatar>
                
                
            }
            title={userDetails.name}
            subheader={userDetails.username}
            />
        </Card>
        <Card variant="elevation" sx={{maxWidth:"80%",width:"100%"}}>
            <Grid container spacing={4}>
                <Grid item md={5}>
                <Card sx={{padding:4,margin:4}} variant="outlined">
                <Typography variant="h6">About</Typography>
                       
                        <List>
                          <ListItem disablePadding>
                            <ListItemIcon>
                              <MenuBook/>
                            </ListItemIcon>
                            <ListItemText >
                             Undergrad at {userDetails.branch}
                            </ListItemText>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon>
                              <School/>
                            </ListItemIcon>
                            <ListItemText>Batch of '{userDetails.batch}</ListItemText>
                          </ListItem>
                         
                        </List>
                </Card>
                </Grid>
                <Grid item md={7}>
                    <Typography variant='body2'>my favorite</Typography>

                </Grid>
            </Grid>
        </Card>
    </div>
  )
}

export default UserDetails