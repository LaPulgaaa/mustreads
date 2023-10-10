import React from 'react'
import { Box, Card,  Grid,  TextField, Typography } from '@mui/material'

import { AccountCircle } from '@mui/icons-material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

function Login() {
  return (
    <div>
      <Box style={{display:'flex',justifyContent:'end'}}>
      <Grid2 container spacing={16}>
        <Grid2  md={6} sm={12} >
        <Card style={{width:400,padding:12}} sx={{maxWidth:400}} variant='outlined'>

            <AccountCircle style={{}} fontSize='large'/>
            <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>Admin</Typography>

           <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="username" 
            fullWidth={true} />
          <TextField style={{padding:4,margin:4}} type='password' variant='outlined' label="password" fullWidth={true}/>

      
        </Card>
        </Grid2>
      <Grid2  md={6} sm={12}>
      <Card style={{width:400,padding:12}} sx={{maxWidth:400}} variant='outlined'>

          <AccountCircle style={{}} fontSize='large'/>
          <Typography style={{display:'flex',justifyContent:'center'}} variant='h6'>Admin</Typography>

      <TextField style={{padding:4,margin:4}} type='text' variant='outlined' label="username" 
      fullWidth={true} 
      
     />
      <TextField style={{padding:4,margin:4}} type='password' variant='outlined' label="password" fullWidth={true}/>

      
  </Card>
      </Grid2>
  
      </Grid2>
     
      </Box>
        
    </div>
  )
}

export default Login