import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

function TaskScheduleTime() {
  const { inputs, handleChange } = useContext(InputsContext);

  return (
    <>
      <div className="form-inputs-line">
        <input
          className="form-inputs line"
          type="date"
          name="date"
          id=""
          value={inputs.date}
          onChange={handleChange}
          required
        />
        <input
          className="form-inputs line"
          type="time"
          name="time"
          id=""
          value={inputs.time}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}

export default TaskScheduleTime;
