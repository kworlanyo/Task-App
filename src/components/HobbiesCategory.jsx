/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function HobbiesCategory({ hobbies }) {
  return (
    <div
    className="task-category-container hobbies"
      style={
        hobbies.length > 0 ? { display: "block", flex: 1 } : { display: "none" }
      }
    >
      {hobbies.length > 0 && <h2>Hobbies 🧘 </h2>}
      {hobbies.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
  );
}

export default HobbiesCategory;
