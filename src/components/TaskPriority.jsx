//  import React, { useState } from 'react';
import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

function TaskPriority() {
  const { inputs, handleChecked } = useContext(InputsContext);

  return (
    <>
      <div>
        <label>
          {" "}
          🚨 Is it a priority?
          <input type="checkbox" name="priority" checked={inputs.priority} onChange={handleChecked} />
        </label>
      </div>
    </>
  );
}

export default TaskPriority;
