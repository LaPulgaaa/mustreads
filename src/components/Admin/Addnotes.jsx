import { Box, Button, Card,IconButton,TextField } from '@mui/material'
import Select from '@mui/material/Select'
 import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React,{useState} from 'react'
import api from '../../api/api';
import { useRecoilState } from 'recoil';
import adminnoteState from '../../store/atom/adminNote';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
function Addnotes() {
    const navigate=useNavigate()
    const [notes,setNotes]=useRecoilState(adminnoteState);
    const [code,setCode]=useState('');
    const [topic,setTopic]=useState('');
    const [content,setContent]=useState('');
    const [category,setCategory]=useState('');
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
        
        <Card variant='outlined' style={{width:800,margin:48,padding:24,backgroundColor:"#f6cd61"}}>
        <IconButton onClick={()=>navigate('/admin/notes')} 
        size="large"><ArrowBack/></IconButton>
            <Box style={{padding:6,margin:6,width:320}} sx={{minWidth:120}}>
            <FormControl fullWidth>
            <InputLabel id="type-content" >Category</InputLabel>
            <Select labelId="type-content"
            onChange={(e)=>setCategory(e.target.value)}
            label="Category"
            value={category}
            >
                <MenuItem value="Assignment">Assignment</MenuItem>
                <MenuItem value="Notes">Class Notes</MenuItem>
            </Select>
            
            </FormControl>
            </Box>
           
            
            
            <TextField value={topic} onChange={(e)=>{
                setTopic(e.target.value)
            }} style={{padding:6,margin:6}} variant="outlined" type='text' fullWidth={true} label="Topic" />
            <TextField value={code} 
            onChange={(e)=>{
                setCode(e.target.value)
            }} style={{padding:6,margin:6}} variant="outlined" type='text' fullWidth={true} label="Course-code" />
            <TextField value={content} onChange={(e)=>{
                
                setContent(e.target.value)
            }} style={{padding:6,margin:6}} multiline  maxRows={8} variant="outlined" type='text' fullWidth={true} label="Add Content" />

            <Button style={{marginTop:12,backgroundColor:"black"}} variant="contained"
             fullWidth={true}
             onClick={async()=>{
                const note={
                    course:code,
                    topic:topic,
                    content:content,
                    category:category
                }
                
                
                const resp=await api.post("/admin/createNotes",note,{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                });
                const new_note=resp.data.new_note;
                const new_notes=[...notes,new_note];
                setNotes(new_notes);
                console.log(resp.data)
                if(resp.status=201)
                navigate('/admin/notes')

             }} 
             >Add Notes</Button>

            


        </Card>
    </div>
  )
}

export default Addnotes