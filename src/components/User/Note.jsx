import React from 'react'
import { useParams } from 'react-router-dom'

function Note() {
    const {noteId}=useParams();
    console.log(noteId)
  return (
    <div>note of a particular subject is going to be displayed here</div>
  )
}

export default Note