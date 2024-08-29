import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

//TOOLTIP
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

function TaskScheduleTime() {
  const { inputs, handleChange } = useContext(InputsContext);

  return (
    <>
      <div className="form-inputs-line1">
        <Tooltip title="select date" theme="light" size="big">
          <input
            className="form-inputs line"
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            required
          />
        </Tooltip>
        <Tooltip title="select time" theme="light" size="big">
          <input
            className="form-inputs line"
            type="time"
            name="time"
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
