import React, { useEffect } from 'react'
import api from '../../api/api.js'
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import adminnoteState from '../../store/atom/adminNote.jsx'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { DeleteForever } from '@mui/icons-material'
import { EditNote } from '@mui/icons-material'
import Grid from '@mui/material/Unstable_Grid2/Grid2.js'
import { AccountCircle} from '@mui/icons-material'
import { LibraryAdd } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
function Notes() {
    const navigate=useNavigate()

    const notes=useRecoilValue(adminnoteState);
    console.log(notes)
    const setNotes=useSetRecoilState(adminnoteState);
    useEffect(()=>{
        async function getNotes(){
            try{
                const resp=await api.get("/admin/notes",{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("token")
                    }
                    
                })
                    if(resp.status==200)
                    {
                        setNotes([...resp.data]);
                    }
                    console.log(resp.data)

            }catch(error)
            {
                console.log(error)
            }

        }
        getNotes();
    },[])

    const data=notes.map((note)=>{
            return(
                <Grid item xl={3}  md={4} sm={6} key={note._id} >
                    <Card variant='outlined'>
                       <CardHeader
                       avatar={
                        <Avatar >
                            {note.topic.charAt(0)}
                        </Avatar>

                       }
                       title={note.topic}
                       subheader={note.course}
                       action={
                        <div>
                        <IconButton onClick={async()=>{
                            try{
                                const resp=await api.delete(`/admin/deleteNote/${note._id}`,{
                                    headers:{
                                        "Authorization":"Bearer "+localStorage.getItem("token")
                                    }
                                })
                                if(resp.status==200)
                                {
                                    const new_notes=notes.filter((left)=>{
                                        if(left._id!==note._id)
                                        return note;
                                    });
                                    setNotes([...new_notes]);
                                }
                                console.log(resp.data)
                            }catch(err)
                            {
                                console.log("Could not delete the task:",err);
                            }
                        }}>
                            <DeleteForever/>
                        </IconButton>
                        <IconButton onClick={()=>{
                            navigate(`/admin/editnotes/${note._id}`)
                        }} aria-label='edit-note'>
                            
                            <EditNote/>
                        </IconButton>
                        </div>
                        
                       }
                       />
                       <CardContent>
                        <Typography variant='body2'>
                            {note.content}
                        </Typography>
                       </CardContent>
                    </Card>
                </Grid>
            )

        
    })

  return (
    <div style={{padding:12,margin:6}}>
        <div style={{display:"flex", justifyContent:"end",marginRight:12}}>
            <IconButton>
                <AccountCircle style={{margin:12,padding:12}} />
                
            </IconButton>
            <IconButton onClick={()=>navigate('/admin/createNotes')}>
            <LibraryAdd style={{margin:12,padding:12}} />
            </IconButton>
        </div>
        <Grid container spacing={4}>
            {data}
        </Grid>
    </div>
  )
}

export default Notes