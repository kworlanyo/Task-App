/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function OtherCategory({ others }) {
  return (
    <div className="task-category-container other" style={{ display: others.length === 0 && "none" }}>
      {others.length > 0 && <h2>Others 📝</h2>}
      <div className="task-category-container-item">
        {others.map((eachTask) => {
          return <TaskItem task={eachTask} key={eachTask._id} />;
        })}
      </div>
    </div>
  );
}

export default OtherCategory;
