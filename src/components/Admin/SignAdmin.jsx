import React from 'react'
import { Grid, Typography,Card,Button,TextField } from '@mui/material'
import { AdminPanelSettings } from '@mui/icons-material'
import { Link } from 'react-router-dom'
function SignAdmin() {
  return (
    <div style={{marginTop:48}}>
        <Grid container>
            <Grid item style={{textAlign:"left",padding:48}} md={6}>
                <Typography variant='h1'>HELP </Typography>
                <Typography variant='h1'>YOUR </Typography>
                <Typography variant='h1'>FRIENDS</Typography>
                <Typography variant='h1'></Typography>
                <Typography variant='h6' style={{fontWeight:"bold"}}>Add your notes and help your friends for the coming exams
                </Typography>
            </Grid>
            <Grid style={{display:'flex',justifyContent:"center"}} item md={6}>
                <Card style={{width:400,padding:48}} sx={{maxWidth:400}} variant='outlined'>

                    <AdminPanelSettings style={{}} fontSize='large'/>
                    <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>Admin</Typography>

                    <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="username" 
                    fullWidth={true} />
                    <TextField style={{padding:4,margin:4}} type='password' variant='outlined' label="password" fullWidth={true}/>

                    <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="Branch" fullWidth={true} />

                    <TextField style={{padding:4,margin:4}} type='text' variant='outlined'
                    helperText="please enter your batch"
                     label="20**" fullWidth={true} />

                    <Button fullWidth={true}  variant='contained' onClick={()=>navigate('/')}>LOG IN</Button>
                    <hr/>
                    

                </Card>
            </Grid>
        </Grid>
        
        
    </div>
  )
}

export default SignAdmin