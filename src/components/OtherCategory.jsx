/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function OtherCategory({ others }) {
  return (
    <div
    className="task-category-container other"
      style={
        others.length > 0 ? { display: "block", flex: 1 } : { display: "none" }
      }
    >
      {others.length > 0 && <h2>Others 📝</h2>}
      <div className="task-category-container-item">
      {others.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
    </div>

  );
}

export default OtherCategory;
