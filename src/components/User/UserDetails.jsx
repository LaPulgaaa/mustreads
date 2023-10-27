
import React, { useEffect, useState } from 'react'
import { Avatar, Card, CardHeader, CardMedia, Grid, List, Typography,ListItem,ListItemIcon,ListItemText, CardContent, IconButton } from '@mui/material'
import { MenuBook,School,Email, Favorite, ArrowBack } from '@mui/icons-material'
import cover from '../Admin/images/cover.jpg'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import User from '../../store/atom/userProfile'
import userFavs from '../../store/atom/userFavs'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { Image } from 'cloudinary-react'
const UserDetails = () => {
    const navigate=useNavigate();
    const notes=useRecoilValue(User);
    console.log(notes)
    const [userDetails,setUserDetails]=useState({});
   const [myFavs,setMyFavs]=useRecoilState(userFavs);
   console.log(myFavs.length)
    useEffect(()=>{
      async function getUser(){
          try{
            const resp=await api.get("/user/details",{
              headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
              }
            })
            // console.log(resp)
            if(resp.status==200)
            {
              setUserDetails({...resp.data.user});
            }

          }catch(err)
          {
            console.log(err)
          }
      }
      getUser();
    },[])
    useEffect(()=>{
      async function getFavs(){
        try{
          const resp=await api.get('/user/getFavs',{
            headers:{
              "Authorization":"Bearer "+localStorage.getItem("token")
            }
          })
          setMyFavs([...resp.data.favs]);
        }catch(err)
        {
          console.log(err);
        }
      }

      getFavs();
    },[])
    
    const dispFavs=myFavs.map((item)=>{
      return(
        <Card sx={{maxWidth:600,padding:4,margin:2,width:"98%"}} key={item._id}>
          <CardHeader
          avatar={
            <Avatar sx={{width:72,height:72}}>
              <Image cloudName="dre4asvrb" publicId={item.publicId}/>
            </Avatar>
          }
          title={item.topic}
          subheader={item.course}
          />
          <CardContent>
            <Typography variant="body2">{item.content}</Typography>
          </CardContent>
        </Card>
      )
    })
 
   
  return (
    <div style={{marginTop:48,display:"flex",flexDirection:"column",alignItems:"center"}}>
     
        <Typography sx={{padding:8}}  variant="h5">Welcome back, {userDetails.username}</Typography>
        <Card  variant="outlined" sx={{maxWidth:"80%",width:"100%"}}>
            <IconButton onClick={()=>navigate('/user/home')} sx={{padding:2,margin:2,backgroundColor:"#f6cd61"}}>
            <ArrowBack/>
          </IconButton>
            <CardMedia component={"img"} height={"304"} image={cover}/>
            <CardHeader  avatar={
                <Avatar sx={{width:74,height:74,fontWeight:"bold",fontSize:5}}>{userDetails.username}</Avatar>
                
                
            }
            title={userDetails.name}
            subheader={userDetails.username}
            />
        </Card>
        <Card variant="elevation" sx={{maxWidth:"80%",width:"100%",fontWeight:"bold"}}>
            <Grid container spacing={4}>
                <Grid item md={5}>
                  <Card sx={{padding:4,margin:4,textAlign:"center"}} variant="outlined">
                  <Typography variant="h6">Notes</Typography>
                  <Typography variant="h4">{notes.length}</Typography>
                  </Card>
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
                {dispFavs}

                </Grid>
            </Grid>
        </Card>
    </div>
  )
}

export default UserDetails