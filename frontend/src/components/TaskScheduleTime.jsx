import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

//TOOLTIP
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

function TaskScheduleTime() {
  const { inputs, handleChange } = useContext(InputsContext);

  return (
    <>
      <div className="form-inputs-line">
        <Tooltip title="select date" theme="light">
          <input
            className="form-inputs line"
            type="date"
            name="date"
            id=""
            value={inputs.date}
            onChange={handleChange}
            required
          />
        </Tooltip>
        <Tooltip title="select time" theme="light">
          <input
            className="form-inputs line"
            type="time"
            name="time"
            id=""
            value={inputs.time}
            onChange={handleChange}
            required
          />
        </Tooltip>
      </div>
    </>
  );
}

export default TaskScheduleTime;
