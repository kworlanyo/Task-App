// import React from 'react'
// import { useState } from 'react'
import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

function TaskDescription() {
  const { inputs, handleChange } = useContext(InputsContext);

  return (
    <>
      <div>
        <label> 📝 Task Description </label>
        <textarea
          name="descriptionInput"
          placeholder="Enter task description"
          rows="6"
          cols="50"
          value={inputs.descriptionInput}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default TaskDescription;
