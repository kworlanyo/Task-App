import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

function TaskScheduleTime() {
  const { inputs, handleChange } = useContext(InputsContext);

  return (
    <>
      <input
        type="date"
        name="date"
        id=""
        value={inputs.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        id=""
        value={inputs.time}
        onChange={handleChange}
        required
      />
    </>
  );
}

export default TaskScheduleTime;
