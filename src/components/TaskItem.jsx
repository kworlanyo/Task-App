/* eslint-disable react/prop-types */
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { InputsContext } from "../contexts/InputsContext";
import { useNavigate } from "react-router-dom";

// CRUD
// Create - POST
// Read - GET
// Update - PUT, PATCH
// Delete - DELETE

function TaskItem({ task }) {
  const { handleDelete, data, setData } = useContext(DataContext);
  const { setInputs } = useContext(InputsContext);

  const navigate = useNavigate();

  function handleUpdate(id) {
    setData(data.filter((taskObj) => taskObj.id !== id)); // Creates a new array of items that matches the condition. If an item does not match the condition, javascript will not add it to the new array.
    const taskToUpdate = data.find((taskObj) => taskObj.id === id); // gets the first item that matches the condition inside the function

    setInputs({
      category: taskToUpdate.category,
      descriptionInput: taskToUpdate.descriptionInput,
      priority: taskToUpdate.priority,
      date: taskToUpdate.date,
      time: taskToUpdate.time,
    });

    navigate("/form");
  }

  return (
    <div>
      <h3>{task.category}</h3>
      <p>{task.descriptionInput}</p>
      <p>{task.priority}</p>
      <p>{task.date}</p>
      <p>{task.time}</p>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
      <button onClick={() => handleUpdate(task.id)}>Edit</button>
    </div>
  );
}

export default TaskItem;
