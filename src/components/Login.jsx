import React from 'react'
import { Box, Button, Card,  Divider,  Grid,  TextField, Typography } from '@mui/material'

import { AccountCircle,AdminPanelSettings } from '@mui/icons-material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate=useNavigate();
  return (
    <div>
      <Box style={{display:'flex',justifyContent:'center'}}>
      <Grid2 container spacing={16}>
        <Grid2 item md={12} lg={6} >
        <Card style={{width:400,padding:24}} sx={{maxWidth:400}} variant='outlined'>

            <AdminPanelSettings style={{}} fontSize='large'/>
            <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>Admin</Typography>

           <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="username" 
            fullWidth={true} />
          <TextField style={{padding:4,margin:4}} type='password' variant='outlined' label="password" fullWidth={true}/>
          <Button fullWidth={true}  variant='contained' onClick={()=>navigate('/')}>LOG IN</Button>
          <hr/>
          <Typography variant='caption'  >DO NOT HAVE AN ACCOUNT
          <Link to="/admin/signup" style={{padding:2}}>SIGN UP</Link>
          </Typography>
      
        </Card>
        </Grid2>
      <Grid2 item  md={12} lg={6} >
      <Card style={{width:400,padding:24}} sx={{maxWidth:400}} variant='outlined'>

          <AccountCircle style={{}} fontSize='large'/>
          <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>User</Typography>

      <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="username" 
      fullWidth={true} 
      
     />
      <TextField style={{padding:4,margin:4}} type='password' variant='outlined' label="password" fullWidth={true}/>
      <Button variant='contained' fullWidth={true}>LOG IN</Button>
      <hr/>
          <Typography variant='caption'  >DO NOT HAVE AN ACCOUNT
          <Link style={{paddingLeft:4}} to="/signup" >SIGN UP</Link>
          </Typography>
      
    </Card>
      </Grid2>
  
      </Grid2>
     
      </Box>
        
    </div>
  )
}

export default Login