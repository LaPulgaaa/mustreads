import React from 'react'
import { useRecoilValue } from 'recoil'
import User from '../../store/atom/userProfile'
import { Avatar, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import api from '../../api/api.js';
import { useState } from 'react';
import avatar from '../Admin/images/admin.jpg'
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
function UserHome() {
    const userData=useRecoilValue(User);
   const navigate=useNavigate();
    const [notes,setNotes]=useState([]);
    const [like,setLike]=useState(false);
   const [notices,setNotices]=useState([]);
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
        async function getNotice(){
            try{
                const resp=await api.get("/user/notice",{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("token")
                    }
                })
                if(resp.status==200){
                    const str=[...resp.data.notices];
                    
                setNotices([...str]);
                console.log("notice uploaded")
                }
            }catch(err)
            {
                console.log(err);
            }
        }
        getNotice();
        getNotes();
    },[])

    const NoteGrid= notes.map((note)=>{
        const id=note._id;
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
                    <Button variant="text" onClick={()=>navigate(`/user/note/${id}`)} >Read More...</Button>
                    </Card>
            </Grid>
        )
    })
    const Story=notices.map((notice)=>{
        return(
            <Grid item md={12}>
        <Card sx={{maxWidth:"80%"}} style={{backgroundColor:"#e9a452"}} variant="elevation">
                    <CardHeader 
                    avatar={
                        <Avatar src={avatar}></Avatar>
                    }
                    title={notice.name}
                    subheader={notice.time}
                    
                    
                    />
                    <CardContent><Typography variant="body2">{notice.announcement}</Typography></CardContent>
        </Card>
    </Grid>
        )
    })
  return (
    <div style={{marginTop:48}}>
        <Grid style={{padding:24,margin:24}} container spacing={4}>
            <Grid container  md={6}>
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