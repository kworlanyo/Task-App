/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function ShoppingCategory({ shopping }) {
  return (
    <div>
      {shopping.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
  );
}

export default ShoppingCategory;
