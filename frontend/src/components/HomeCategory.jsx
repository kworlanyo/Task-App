/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function HomeCategory({ home }) {
  return (
    <div className="task-category-container home" style={{ display: home.length === 0 && "none" }}>
      {home.length > 0 && <h2>Home 🏡</h2>}
      <div className="task-category-container-item">
        {home.map((eachTask) => {
          return <TaskItem task={eachTask} key={eachTask._id} />;
        })}
      </div>
    </div>
  );
}

export default HomeCategory;
