/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { InputsContext } from "../contexts/InputsContext";
import { useNavigate } from "react-router-dom";

//ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
//

function TaskItem({ task }) {
  const { handleDelete, data, setData } = useContext(DataContext);
  const { setInputs } = useContext(InputsContext);
  const [check, setCheck] = useState(false);

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
      id: taskToUpdate.id,
    });

    navigate("/form");
  }

  const style = {
    backgroundColor:
      task.priority && task.category === "home"
        ? "#9acfdb"
        : task.priority && task.category === "work"
        ? "#e6bac6"
        : task.priority && task.category === "hobbies"
        ? "#93cfbb"
        : task.priority && task.category === "shopping"
        ? "#ded6a6"
        : task.priority && task.category === "others"
        ? "#b5b5e8"
        : "#f9f9f9",
  };

  return (
    <div className="task-item-container" style={style}>
      <div className="menu-item">
        <button onClick={() => handleDelete(task.id)}>
          <FontAwesomeIcon icon={faTrash} />{" "}
        </button>
        <button onClick={() => handleUpdate(task.id)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      <div className="schedule">
        <p>{task.date}</p>
        <p>|</p>
        <p>{task.time}</p>
      </div>
      <p>{task.descriptionInput}</p>
      <p>Priority: {task.priority ? "High" : "Low"}</p>
      <label htmlFor="">done? </label>
      <input
        label="done?"
        type="checkbox"
        name="checkbox"
        id=""
        checked={check}
        onChange={(e) => setCheck(e.target.checked)}
      />
      {check === true && <p>completed</p>}
    </div>
  );
}

export default TaskItem;
