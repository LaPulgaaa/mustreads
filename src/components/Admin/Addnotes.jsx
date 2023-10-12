import { Button, Card,TextField } from '@mui/material'
import Select from '@mui/material/Select'
 import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React,{useState} from 'react'

function Addnotes() {

    const [category,setCategory]=useState('');
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
        <Card variant='outlined' style={{width:800,margin:48,padding:24}}>
            <FormControl>
            <InputLabel id="type-content" >Category</InputLabel>
            <Select labelId="type-content"
            label="Category"
            value={category}
            >
                <MenuItem value="Assignment">Assignment</MenuItem>
                <MenuItem value="Notes">Class Notes</MenuItem>
            </Select>
            
            </FormControl>
            
            
            <TextField style={{padding:6,margin:6}} variant="outlined" type='text' fullWidth={true} label="Course-code" />
            <TextField style={{padding:6,margin:6}} variant="outlined" type='text' fullWidth={true} label="Topic" />
            <TextField style={{padding:6,margin:6}} multiline  maxRows={8} variant="outlined" type='text' fullWidth={true} label="Add Content" />

            <Button style={{marginTop:12}} variant="contained" fullWidth={true}>Add Notes</Button>

            


        </Card>
    </div>
  )
}

export default Addnotes