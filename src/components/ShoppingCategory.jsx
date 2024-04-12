/* eslint-disable react/prop-types */
import TaskItem from "./TaskItem";

function ShoppingCategory({ shopping }) {
  return (
    <div
      style={
        shopping.length > 0
          ? { display: "block", flex: 1 }
          : { display: "none" }
      }
    >
      {shopping.length > 0 && <h2>Shopping</h2>}
      {shopping.map((eachTask) => {
        return <TaskItem task={eachTask} key={eachTask.id} />;
      })}
    </div>
  );
}

export default ShoppingCategory;
