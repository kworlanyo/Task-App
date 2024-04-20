/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function WorkCategory({ work }) {
  return (
    <div
      className="task-category-container work"
      style={
        work.length > 0 ? { display: "block", flex: 1 } : { display: "none" }
      }
    >
      {work.length > 0 && <h2>Work 🧑🏾‍💻 </h2>}
      <div className="task-category-container-item">
        {work.map((eachTask) => {
          return <TaskItem task={eachTask} key={eachTask.id} />;
        })}
      </div>
    </div>
  );
}

export default WorkCategory;
