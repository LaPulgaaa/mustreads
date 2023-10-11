import React from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate=useNavigate()
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignSelf:"center",padding:12}}>
        <div style={{cursor:"pointer",marginLeft:12}} onClick={()=>{
            navigate('/')
        }}>
        <Typography variant='h6'>Must Reads</Typography>
        </div>
       
        <div style={{paddingRight:12}}>
            <Button style={{marginRight:12}} variant='text'>Read</Button>
            
            <Button style={{marginRight:12}} variant='text'>Student</Button>
            <Button style={{marginRight:12}} variant='text'>Admin</Button>
            <Button style={{marginRight:12}} variant='text'
            onClick={()=>{
              localStorage.removeItem("token")
              window.location="/"
            }}
            >LOG OUT</Button>
        </div>
    </div>
  )
}

export default Navbar