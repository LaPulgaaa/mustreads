import React from 'react'
import { Card, TextField } from '@mui/material'
function Login() {
  return (
    <div>
        <Card varint={"outlined"}>
            <TextField type='text' variant='outlined' label="username" fullWidth={true} />
            <TextField type='password' variant='outlined' label="password" fullWidth={true}/>

            
        </Card>
    </div>
  )
}

export default Login