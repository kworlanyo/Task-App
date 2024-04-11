/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function HobbiesCategory({ hobbies }) {
  return (
    <div>
      {hobbies.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
  );
}

export default HobbiesCategory;
