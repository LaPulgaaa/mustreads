import React from 'react'
import { Grid, Typography,Card,Button,TextField } from '@mui/material'
import { AdminPanelSettings } from '@mui/icons-material'
import { Link } from 'react-router-dom'
function SignAdmin() {
  return (
    <div style={{marginTop:48}}>
        <Grid container>
            <Grid item style={{textAlign:"left",padding:48}} md={6}>
                <Typography variant='h1'>GET </Typography>
                <Typography variant='h1'>READY </Typography>
                <Typography variant='h1'>FOR</Typography>
                <Typography variant='h1'>EXAMS</Typography>
                <Typography variant='h6' style={{fontWeight:"bold"}}>Refer to note of your class toppers.All free.Add your notes and help your friends</Typography>
            </Grid>
            <Grid style={{display:'flex',justifyContent:"center"}} item md={6}>
                <Card style={{width:400,padding:48}} sx={{maxWidth:400}} variant='outlined'>

                    <AdminPanelSettings style={{}} fontSize='large'/>
                    <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>Admin</Typography>

                    <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="username" 
                    fullWidth={true} />
                    <TextField style={{padding:4,margin:4}} type='password' variant='outlined' label="password" fullWidth={true}/>
                    <Button fullWidth={true}  variant='contained' onClick={()=>navigate('/')}>LOG IN</Button>
                    <hr/>
                    <Typography variant='caption'  >DO NOT HAVE AN ACCOUNT
                    <Link to="/signup" style={{padding:2}}>SIGN UP</Link>
                    </Typography>

                </Card>
            </Grid>
        </Grid>
        
        
    </div>
  )
}

export default SignAdmin