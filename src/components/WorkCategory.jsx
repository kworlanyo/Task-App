/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function WorkCategory({ work }) {
  return (
    <div
      style={
        work.length > 0 ? { display: "block", flex: 1 } : { display: "none" }
      }
    >
      {work.length > 0 && <h2>Work</h2>}
      {work.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
  );
}

export default WorkCategory;
