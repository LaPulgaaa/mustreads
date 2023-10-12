import React, { useEffect } from 'react'
import api from '../../api/api.js'
import { Typography } from '@mui/material'
import adminnoteState from '../../store/atom/adminNote.jsx'
import { useRecoilValue, useSetRecoilState } from 'recoil'
function Notes() {

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
        
    })

  return (
    <div>
        <Typography variant='h2'> collection of my notes</Typography>
    </div>
  )
}

export default Notes