import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

function TaskPriority() {
  const { inputs, handleChecked } = useContext(InputsContext);

  return (
    <>
      <div className="container-priority">
        <label className="form-inputs-line2">
          Is it a priority? 🚨
          <input
            className="form-inputs line"
            type="checkbox"
            name="priority"
            checked={inputs.priority}
            onChange={handleChecked}
          />
        </label>
      </div>
    </>
  );
}

export default TaskPriority;
