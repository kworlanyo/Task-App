/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function HomeCategory({ home }) {
  return (
    <div
      style={
        home.length > 0 ? { display: "block", flex: 1 } : { display: "none" }
      }
    >
      {home.length > 0 && <h2>Home</h2>}
      {home.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
  );
}

export default HomeCategory;
