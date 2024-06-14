/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function ShoppingCategory({ shopping }) {
  return (
    <div className="task-category-container shopping" style={{ display: shopping.length === 0 && "none" }}>
      {shopping.length > 0 && <h2>Shopping 🛒</h2>}
      <div className="task-category-container-item">
        {shopping.map((eachTask) => {
          return <TaskItem task={eachTask} key={eachTask._id} />;
        })}
      </div>
    </div>
  );
}

export default ShoppingCategory;
