import {  Box, Card, CardHeader, Typography,Avatar } from '@mui/material'
// import Avatar from '@mui/material'
import React from 'react'

function AdminPanel() {
  return (
    <div style={{display:"flex",margin:64,padding:24,marginLeft:256}}>
        <Box >
            <Typography variant="h4">Profile</Typography>
            <Typography variant="body2">Admin:Dashboard</Typography>
            <Card style={{width:800}}>
                <CardHeader
                avatar={
                    <Avatar sx={{width:64,height:64}} aria-label="profile pic">
                            V
                    </Avatar>
                }
                title="Varun Singh"
                subheader="Lapulga"
                 />
            </Card>
        </Box>
    </div>
  )
}

export default AdminPanel