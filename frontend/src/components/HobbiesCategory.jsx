/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function HobbiesCategory({ hobbies }) {
  return (
    <div className="task-category-container hobbies" style={{ display: hobbies.length === 0 && "none" }}>
      {hobbies.length > 0 && <h2>Hobbies 🧘 </h2>}
      <div className="task-category-container-item">
        {hobbies.map((eachTask) => {
          return <TaskItem task={eachTask} key={eachTask.id} />;
        })}
      </div>
    </div>
  );
}

export default HobbiesCategory;
