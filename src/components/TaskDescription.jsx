import React from 'react'
import { useState } from 'react'

function TaskDescription() {
    const [descriptionInput, setDescriptionInput] = useState('')

  return (
    <>
    <div>
      <label> 📝 Task Description </label>
      <textarea name="taskDescription"  placeholder="Enter task description" rows="6" cols="50" value ={descriptionInput} onChange= {(e) => setDescriptionInput(e.target.value)} />
    </div>
    </>
  )
}

export default TaskDescription