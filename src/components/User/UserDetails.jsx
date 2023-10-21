
import React from 'react'
import { Avatar, Card, CardHeader, CardMedia, Grid, List, Typography,ListItem,ListItemIcon,ListItemText, CardContent, IconButton } from '@mui/material'
import { MenuBook,School,Email, Favorite } from '@mui/icons-material'
import cover from '../Admin/images/cover.jpg'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import User from '../../store/atom/userProfile'
import userFavs from '../../store/atom/userFavs'
const UserDetails = () => {
    const userDetails=useRecoilValue(User);
   const [myFavs,setMyFavs]=useRecoilState(userFavs);
    console.log(myFavs);
    console.log(userDetails);
  let list;
    if(myFavs.length>=1)
    {
      list=myFavs.map((note)=>{
        return(
          <Card style={{width:"100%",padding:4,margin:4}} variant="elevation">
            <CardHeader
            avatar={
              <Avatar >{note.category.charAt(0) }</Avatar>
            } 
            action={
              <IconButton onClick={()=>{
                const new_Favs=myFavs.map((liked)=>{
                  if(liked._id!==note._id)
                  return liked;
                })
                // setMyFavs([...new_Favs]);
              }}>
                <Favorite/>
              </IconButton>
            }
            title={note.course}
            subheader={note.category}
            />
            <CardContent>
              <Typography variant="body2">{note.topic}</Typography>
            </CardContent>
          </Card>
        )
      })
    }
  return (
    <div style={{marginTop:48,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography sx={{padding:8}}  variant="h5">Welcome back, {userDetails.username}</Typography>
        <Card  variant="outlined" sx={{maxWidth:"80%",width:"100%"}}>
        
            <CardMedia component={"img"} height={"304"} image={cover}/>
            <CardHeader  avatar={
                <Avatar sx={{width:74,height:74,fontWeight:"bold"}}>{userDetails.username.charAt(0)}</Avatar>
                
                
            }
            title={userDetails.name}
            subheader={userDetails.username}
            />
        </Card>
        <Card variant="elevation" sx={{maxWidth:"80%",width:"100%",fontWeight:"bold"}}>
            <Grid container spacing={4}>
                <Grid item md={5}>
                <Card sx={{padding:4,margin:4}} variant="outlined">
                <Typography variant="body2">The biggest risk you can take is to not take one.</Typography>
                       
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
                {list!=undefined?list:<></>}

                </Grid>
            </Grid>
        </Card>
    </div>
  )
}

export default UserDetails