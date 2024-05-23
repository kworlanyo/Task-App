import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

function TaskDescription() {
  const { inputs, handleChange } = useContext(InputsContext);

  return (
    <>
      {/* <div> */}
      {/* <label> 📝 Task Description </label> */}
      <textarea
        className="form-inputs"
        name="descriptionInput"
        placeholder="describe the task here..."
        rows="6"
        cols="50"
        value={inputs.descriptionInput}
        onChange={handleChange}
        required
      />
      {/* </div> */}
    </>
  );
}

export default TaskDescription;
