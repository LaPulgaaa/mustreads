import React from 'react'
import { useRecoilValue } from 'recoil'
import User from '../../store/atom/userProfile'
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import api from '../../api/api.js';
import { useState } from 'react';
function UserHome() {
    const userData=useRecoilValue(User);
    console.log(userData);
    const [notes,setNotes]=useState([]);

    //get all the courses of the all the admin
    useEffect(()=>{
        async function getNotes(){
            try{
                const resp=await api.get('/user/notes',{
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("token")
                    }
                });
                console.log(resp.data)
            }catch(error)
            {
                console.log(error+"error occured!!")
            }
        }
        getNotes();
    },[])
  return (
    <div>
        <Grid>

        </Grid>
    </div>
  )
}

export default UserHome