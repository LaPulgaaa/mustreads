import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import avatar from '../Admin/images/admin.jpg'
import { ArrowBack } from '@mui/icons-material';
import {IconButton }from '@mui/material';
function Note() {
    const {noteId}=useParams();
    console.log(noteId);
    const [note,setNote]=useState({});

    useEffect(()=>{
      async function findNote(){
        try{
          const resp=await api.get(`/user/note/${noteId}`,{
            headers:{
              "Authorization":"Bearer "+localStorage.getItem("token")
            }
          })
          console.log(resp.data.note);
          setNote({...resp.data.note});
        }catch(err)
        {
          console.log(err)
        }
      }
      findNote();
    },[])

    const Note=<Card sx={{maxWidth:600,margin:24,backgroundColor:"#f6cd61"}} variant="outlined">
              <IconButton onClick={()=>window.location="/user/home"} style={{padding:12,margin:12,backgroundColor:"#2c7972"}}>
                <ArrowBack />
              </IconButton>
                <Typography style={{textAlign:"center",margin:12}} variant='h5'>{note.topic}</Typography>
                <CardHeader 
                avatar={
                  <Avatar src={avatar}></Avatar>
                }
                title={note.course}
                subheader={note.category}
                />
                <CardContent>
                  <Typography variant="body1">{note.content}</Typography>
                </CardContent>
              </Card>
  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:64,padding:12}}>
      
      {Note}
    </div>
  )
}

export default Note