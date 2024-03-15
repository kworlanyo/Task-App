/* eslint-disable react/prop-types */
function TaskItem({ task }) {
  return (
    <div>
      <h3>{task.category}</h3>
      <p>{task.descriptionInput}</p>
      <p>{task.priority}</p>
      <p>{task.date}</p>
      <p>{task.time}</p>
      <button>Delete</button>
      <button>Edit</button>
    </div>
  );
}

export default TaskItem;
