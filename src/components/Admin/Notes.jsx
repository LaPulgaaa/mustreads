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
                <Grid item md={4} sm={1}  key={note._id} >
                    <Card variant='outlined'>
                       <CardHeader
                       avatar={
                        <Avatar sx={{bgcolor:blue[200]}}>
                            {note.title.charAt(0)}
                        </Avatar>

                       }
                       title={note.topic}
                       subheader={note.course}
                       action={
                        <IconButton aria-label='delete note'>
                            <DeleteForever/>
                            <EditNote/>
                        </IconButton>
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