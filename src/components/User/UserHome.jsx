import React from 'react'
import { useRecoilValue } from 'recoil'
import User from '../../store/atom/userProfile'
import { Avatar, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import api from '../../api/api.js';
import { useState } from 'react';
import avatar from '../Admin/images/admin.jpg'
import { Favorite, FavoriteBorder } from '@mui/icons-material';
function UserHome() {
    const userData=useRecoilValue(User);
   
    const [notes,setNotes]=useState([]);
    const [like,setLike]=useState(false);
   
    //get all the courses of the all the admin
    useEffect(()=>{
        async function getNotes(){
            try{
                const resp=await api.get('/user/notes',{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("token")
                    }
                });
                // console.log(resp.data);
                if(resp.status==200)
                setNotes([...resp.data.notes]);
            }catch(error)
            {
                console.log(error+"error occured!!")
            }
        }
        getNotes();
    },[])

    const NoteGrid= notes.map((note)=>{
        return (
            <Grid item md={6}  key={note._id}>
                    <Card style={{backgroundColor:"#f6cd61",margin:4}} variant='outlined' sx={{maxWidth:450}}>
                    <CardHeader 
                    avatar={
                        <Avatar src={avatar}></Avatar>
                    }
                    title={note.topic}
                    subheader={note.course}
                    action={
                        <IconButton onClick={()=>setLike(!like)}>
                            {like?<Favorite/>:<FavoriteBorder/>}
                        </IconButton>
                    }
                    />
                    <CardContent><Typography variant="body2">{note.content}</Typography></CardContent>
                    <Button variant="text" >Read More</Button>
                    </Card>
            </Grid>
        )
    })
    const Story=<Grid item md={12}>
        <Card sx={{maxWidth:"80%"}} variant="elevation">
                    <CardHeader 
                    avatar={
                        <Avatar src={avatar}></Avatar>
                    }
                    title="Varun Singh"
                    subheader="EEE-2025"
                    
                    />
                    <CardContent><Typography variant="body2">It is to be noted that class viva for cs will be conducted coming monday.</Typography></CardContent>
        </Card>
    </Grid>
  return (
    <div style={{marginTop:48}}>
        <Grid style={{padding:24,margin:24}} container spacing={2}>
            <Grid container md={6}>
                {NoteGrid}
            </Grid>
            <Grid container md={6}>
            {Story}
            </Grid>
        </Grid>
    </div>
  )
}

export default UserHome