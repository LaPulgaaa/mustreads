import { TextField, Typography,Card, Button } from '@mui/material'
// import Grid from '@mui/material/Unstable_Grid2/Grid2'
import {Grid} from '@mui/material';
import React, { useState } from 'react'

function SignUp() {
    const [first,setFirst]=useState('');
    const [last,setLast]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');
  return (
    <div style={{marginTop:48}}>
        <Grid container spacing={2}>
            <Grid md={6} style={{textAlign:"center"}} fontWeight={"bold"}  item>
                <Typography variant='h1'>GET</Typography>
                <Typography variant='h1'>READY</Typography>
                <Typography variant='h1'>FOR</Typography>
                <Typography variant='h1'>EXAMS</Typography>

            </Grid>

            <Grid  md={6}  style={{padding:12,display:"flex",justifyContent:"center"}}   item>
                <Card sx={{maxWidth:400}} variant="outlined" style={{width:400,padding:24}}>
                <TextField fullWidth={true} style={{padding:4,marginTop:6}} type="text" variant='outlined' label="First Name" />
                <TextField fullWidth={true} style={{padding:4,marginTop:6}} type='text' variant='outlined' label="Last Name" />
                <TextField fullWidth={true} style={{padding:4,marginTop:6}} type='text' variant='outlined' label="Username" />
                <TextField fullWidth={true} style={{padding:4,marginTop:6}} type='text' variant='outlined' label="Password" />
                <TextField fullWidth={true} style={{padding:4,marginTop:6}} type='text' variant='outlined' label="Confirm Password" />
                <Button fullWidth={true} style={{margin:6,backgroundColor:"black"}} variant="contained">Create Account</Button>
                </Card>
               

            </Grid>

        </Grid>
    </div>
  )
}

export default SignUp