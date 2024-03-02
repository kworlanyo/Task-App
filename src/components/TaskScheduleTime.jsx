import { useState } from "react";

function TaskScheduleTime() {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  // const date = new Date().toLocaleDateString();
  // console.log(date);
  return (
    <>
      <input type="date" name="date" id="" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
      <input type="time" name="time" id="" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
      <h2>{newDate}</h2>
      <h3>{newTime}</h3>
    </>
  );
}

export default TaskScheduleTime;
