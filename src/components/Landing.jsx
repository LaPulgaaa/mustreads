import React from 'react'
import Intro from './content/Intro'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Login from './Login'
function Landing() {
  return (
    <div>
        <Grid container spacing={8}>
            <Grid md={4}>
                <Intro/>
            </Grid>
            <Grid md={8}>
             <Login/>
            </Grid>
        </Grid>
    </div>
  )
}

export default Landing