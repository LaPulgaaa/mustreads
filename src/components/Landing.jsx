import React from 'react'
import Intro from './content/Intro'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Login from './Login'
function Landing() {
  return (
    <div style={{padding:48,marginTop:128}}>
        <Grid container spacing={8} >
            <Grid item md={4} sm={12}>
                <Intro/>
            </Grid>
            <Grid item md={8} sm={12}>
             <Login/>
            </Grid>
        </Grid>
    </div>
  )
}

export default Landing