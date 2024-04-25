/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function ShoppingCategory({ shopping }) {
  return (
    <div
      className="task-category-container shopping"
      style={
        shopping.length > 0
          ? { display: "block", flex: 1 }
          : { display: "none" }
      }
    >
      {shopping.length > 0 && <h2>Shopping 🛒</h2>}
      <div className="task-category-container-item">
        {shopping.map((eachTask) => {
          return <TaskItem task={eachTask} key={eachTask.id} />;
        })}
      </div>
    </div>
  );
}

export default ShoppingCategory;
