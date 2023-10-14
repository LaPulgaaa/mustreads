import { Box, Button, Card, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import adminnoteState from '../../store/atom/adminNote';
import api from '../../api/api';
function Editnotes() {
    const {noteId}=useParams();
    const notes=useRecoilValue(adminnoteState);
    
    const editNote=notes.find((note)=>{
       
        if(note._id == noteId)
        return note;
    });
    // console.log(editNote)
    const [edit_title,setEdit_title]=useState(editNote.topic);
    const [edit_content,setEdit_content]=useState(editNote.content);
    const [edit_course,setEdit_course]=useState(editNote.course);
    // console.log(editNote)
    
  return (
    <div style={{marginTop:48,padding:12,display:"flex",justifyContent:"center"}}>
       <Card variant="outlined" style={{width:812,backgroundColor:"#e9a451",padding:24,margin:12}}>
            <TextField style={{padding:4,margin:12}} value={edit_title} variant='outlined' fullWidth={true} label="Edit Topic"
            onChange={(e)=>setEdit_title(e.target.value)} 
            type='text'  />
            <TextField style={{padding:4,margin:12}} value={edit_course} variant='outlined' fullWidth={true} label="Edit Topic"
            onChange={(e)=>setEdit_course(e.target.value)} type='text'  />
            <TextField style={{padding:4,margin:12}} multiline value={edit_content} variant='outlined' fullWidth={true}
            onChange={(e)=>setEdit_content(e.target.value)} 
            label="Edit Topic" type='text'  />
            <Button variant='contained' 
            onClick={async()=>{
               try{
                    const resp= await api.put(`admin/editNote/${noteId}`,{
                    title:edit_title,
                    content:edit_content,
                    course:edit_course
                })
                console.log(resp.data.note_edit);
               }catch(err)
               {
                console.log(err)
               }
            }}
            fullWidth={true}>Save</Button>
       </Card>
    </div>
  )
}

export default Editnotes