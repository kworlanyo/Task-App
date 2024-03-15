/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function HomeCategory({ home }) {
  return (
    <div>
      {home.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
  );
}

export default HomeCategory;
