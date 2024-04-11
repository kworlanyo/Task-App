/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function WorkCategory({ work }) {
  return (
    <div>
      {work.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
  );
}

export default WorkCategory;
